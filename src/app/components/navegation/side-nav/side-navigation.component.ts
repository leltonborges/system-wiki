import {
  Component,
  ElementRef,
  OnDestroy,
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
import { Filter } from '../../../common/interface/Filter';
import { FilterService } from '../../../common/service/filter.service';
import { Subscription } from 'rxjs';

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
               MatAutocompleteModule
             ],
             templateUrl: './side-navigation.component.html',
             styleUrl: './side-navigation.component.sass',
             providers: [
               provideMomentDateAdapter(FORMAT_DATE)
             ]
           })
export class SideNavigationComponent
  implements OnInit,
             OnDestroy {
  readonly minDate = new Date(2020, 1, 1);
  readonly maxDate = new Date();
  readonly formFilter = this.createdFormGroup();
  tagsOptions: Tags = []
  @ViewChild('inputTag')
  inputTag!: ElementRef<HTMLInputElement>;
  private _tags!: Tags;
  private filterSubscription!: Subscription;

  constructor(private readonly _messageRef: MessageRef,
              private readonly _route: Router,
              private readonly _tagService: TagService,
              private readonly _filterService: FilterService
  ) {}

  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this._tagService
        .findAllTags()
        .subscribe((tags: Tags) => {
          this._tags = tags;
          this.tagsOptions = tags;
          this.subscribeToFilterChanges();
        });
  }

  searchByFilter() {
    if(this.isFormEmpty()) {
      this._messageRef.error('É necessário um fitro preenchido')
      return;
    }

    const { title, author, tag, startDate, endDate } = this.formFilter.controls;
    const selectedTag = this.getTag(tag.value?.toUpperCase());
    const filter: Filter = {
      title: title.value,
      author: author.value,
      tag: selectedTag?.id,
      startDate: startDate?.value,
      endDate: endDate?.value
    }
    this._route.navigate(['article', 'list'], { queryParams: this._filterService.push(filter) })
        .catch(() => this._messageRef.error('Error na navegação'))
  }

  filterTag(): void {
    const filterValue = this.inputTag.nativeElement.value.toLowerCase();
    this.tagsOptions = this._tags.filter(o => o.name.toLowerCase().includes(filterValue));
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
    this.filterSubscription = this._filterService
                                  .getFilterObservable()
                                  .subscribe((filter: Filter) => {
                                    let tag;
                                    if(filter.tag) {
                                      tag = this.getTag(filter.tag)?.name;
                                    }
                                    this.formFilter.patchValue({ ...filter, tag });
                                  });
  }

  private getTag(nameOrId: string): Tag | undefined {
    return this._tags.find(t =>
                             t.name.toUpperCase()
                              .includes(nameOrId.toUpperCase())
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
