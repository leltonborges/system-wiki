import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  MatDatepicker,
  MatDatepickerModule
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MessageRef } from '@c/core/common/message-ref';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import { TagService } from '../../../common/service/tag.service';
import {
  Tag,
  Tags
} from '@c/navegation/model/tag';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import {
  Filter,
  filterDefault
} from '../../../common/interface/filter';
import {
  of,
  switchMap
} from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { SelectTagComponent } from '@c/core/components/select-tag/select-tag.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../common/reducer';
import { selectFilter } from '../../../common/reducer/filter/filter.selectors';
import { filterActions } from '../../../common/reducer/filter/filter.actions';
import { debounceTimeFilter } from '@c/core/utils/TimeUtils';

const FORMAT_DATE = {
  parse: {
    dateInput: 'MM/YYYY'
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
             selector: 'cs-side-navigation',
             standalone: true,
             imports: [
               MatInputModule,
               MatFormFieldModule,
               MatDatepickerModule,
               MatSelectModule,
               FormsModule,
               ReactiveFormsModule,
               MatButtonModule,
               MatIconModule,
               MatTooltipModule,
               MatAutocompleteModule,
               SelectTagComponent
             ],
             templateUrl: './side-navigation.component.html',
             styleUrl: './side-navigation.component.sass',
             providers: [
               provideMomentDateAdapter(FORMAT_DATE)
             ]
           })
export class SideNavigationComponent
  implements OnInit {
  readonly minDate = new Date(2020, 1, 1);
  readonly maxDate = new Date();
  readonly formFilter = this.createdFormGroup();
  tagsOptions: Tags = []
  @ViewChild('inputTag')
  inputTag!: ElementRef<HTMLInputElement>;
  @Input({ alias: 'toggle' })
  sidenav!: MatSidenav;
  private _tags!: Tags;

  constructor(private readonly _messageRef: MessageRef,
              private readonly _route: Router,
              private readonly _store: Store<AppState>,
              private readonly _tagService: TagService
  ) {}

  ngOnInit(): void {
    this._tagService
        .findAllTags()
        .subscribe((tags: Tags) => {
          this._tags = tags;
          this.tagsOptions = tags;
          this.subscribeToFilterChanges();
          this.listenForInputChanges();
        });
  }

  getTagFormControl(): FormControl {
    const { tag } = this.formFilter.controls;
    return tag as FormControl;
  }

  searchByFilter() {
    if(this.isFormEmpty()) {
      this._messageRef.error('É necessário um fitro preenchido')
      return;
    }
    const filter = this.processFilterForm();
    this._route.navigate(['article', 'list'],
                         {
                           queryParams: filter,
                           replaceUrl: true,
                           queryParamsHandling: 'merge'
                         })
        .then(() => this.sidenav?.toggle())
        .catch(() => this._messageRef.error('Error na navegação'))
  }

  private processFilterForm(): Filter {
    const { title, author, tag, startDate, endDate } = this.formFilter.controls;
    const selectedTag = this.getTag(tag.value?.toUpperCase());
    return {
      ...filterDefault,
      title: title.value,
      authorName: author.value,
      tagId: selectedTag?.id,
      startDate: startDate?.value,
      endDate: endDate?.value
    };
  }

  setYearMonthStart(yearMonthSelect: Moment,
                    datepicker: MatDatepicker<Moment>) {
    const { endDate } = this.formFilter.controls;

    if(!!endDate.value && yearMonthSelect.isAfter(endDate.value))
      this._messageRef.error('A data selecionar é superior a data de termino')
    else
      this.formFilter.patchValue({ startDate: yearMonthSelect });
    datepicker.close();
  }

  setYearMonthEnd(yearMonthSelect: Moment,
                  datepicker: MatDatepicker<Moment>) {
    const { startDate } = this.formFilter.controls;

    if(!!startDate.value && yearMonthSelect.isBefore(startDate.value))
      this._messageRef.error('A data selecionar é inferior a data de inicio')
    else
      this.formFilter.patchValue({ endDate: yearMonthSelect });

    datepicker.close();
  }

  private subscribeToFilterChanges() {
    this._store.select(selectFilter)
        .subscribe((filter: Filter) => {
          let tag;
          if(filter.tagId) {
            tag = this.getTag(filter.tagId)?.name;
          }
          this.formFilter.patchValue({ ...filter, tag }, { emitEvent: false });
        });
  }

  private listenForInputChanges() {
    this.formFilter
        .valueChanges
        .pipe(debounceTimeFilter(),
              switchMap(() => of(this.processFilterForm())))
        .subscribe((filter: Filter) => {
          this._store.dispatch(filterActions.setFilterAction({ filter }));
        })
  }

  private getTag(nameOrId: string): Tag | undefined {
    return this._tags.find(t =>
                             t.name.toUpperCase()
                              .includes(nameOrId?.toUpperCase())
                             || t.id == nameOrId);
  }

  private createdFormGroup(): FormGroup {
    return new FormGroup({
                           title: new FormControl(null),
                           author: new FormControl(null),
                           tag: new FormControl(null),
                           startDate: new FormControl(null),
                           endDate: new FormControl(null)
                         });
  }

  resetFilter() {
    this.formFilter.reset();
  }

  private isFormEmpty(): boolean {
    const formControls = this.formFilter.controls;
    return Object.values(formControls)
                 .every(control => {
                   const value = control.value;
                   return value === null || value === '';
                 });
  }
}
