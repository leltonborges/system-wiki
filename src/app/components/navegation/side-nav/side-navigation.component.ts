import {
  Component,
  ElementRef,
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
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Moment } from 'moment';
import { TagService } from '../../../common/service/tag.service';
import { Tags } from '@c/navegation/model/tag';

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
             styleUrl: './side-navigation.component.sass'
           })
export class SideNavigationComponent
  implements OnInit {
  readonly minDate = new Date(2020, 1, 1);
  readonly maxDate = new Date();
  readonly formFilter = this.createdFormGroup();
  tagsOptions: Tags = []
  @ViewChild('inputTag')
  inputTag!: ElementRef<HTMLInputElement>;
  private _tags!: Tags;

  constructor(private readonly _messageRef: MessageRef,
              private readonly _route: Router,
              private readonly _tagService: TagService
  ) {
  }

  ngOnInit(): void {
    this._tagService
        .findAllTags()
        .subscribe((result: Tags) => this._tags = result)
    this.tagsOptions = this._tags
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

  searchByFilter() {
    const { title, author, tag, startDate, endDate } = this.formFilter.controls;
    this._route.navigate([], {
      queryParams: {
        title: title.value,
        author: author.value,
        tag: tag.value,
        startDate: startDate.value?.format('YYYYMM'),
        endDate: endDate.value?.format('YYYYMM')
      }
    })
        .catch(() => this._messageRef.error('Error na navegação'))
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
}
