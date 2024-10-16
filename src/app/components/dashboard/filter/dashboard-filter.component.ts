import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerModule
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Moment } from 'moment/moment';
import { MatSelectModule } from '@angular/material/select';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDateFormats } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MessageRef } from '@c/core/common/message-ref';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BehaviorSubject } from 'rxjs';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

export const FORMAT_YEAR: MatDateFormats = {
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
             selector: 'cs-dashboard-filter',
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
             templateUrl: './dashboard-filter.component.html',
             styleUrl: './dashboard-filter.component.sass',
             changeDetection: ChangeDetectionStrategy.OnPush,
             encapsulation: ViewEncapsulation.None,
             providers: [
               provideMomentDateAdapter(FORMAT_YEAR)
             ]
           })
export class DashboardFilterComponent
  implements OnInit {
  readonly minDate = new Date(2020, 1, 1);
  readonly maxDate = new Date();
  readonly formFilter = this.createdFormGroup();
  tagsOptions: string[] = []
  @ViewChild('inputTag')
  inputTag!: ElementRef<HTMLInputElement>;
  private readonly _tags$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private readonly _messageRef: MessageRef,
              private readonly _route: Router,
              private readonly _router: ActivatedRoute
  ) {
    this.tagsOptions = this._tags$.value.slice();
  }

  ngOnInit(): void {
    const tags = this._router.snapshot.data['tags'];
    if(tags && tags.length > 0) {
      this._tags$.next(tags);
    }
  }

  filterTag(): void {
    const filterValue = this.inputTag.nativeElement.value.toLowerCase();
    this.tagsOptions = this._tags$.value.filter(o => o.toLowerCase().includes(filterValue));
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

  private createdFormGroup(): FormGroup {
    return new FormGroup({
                           title: new FormControl(null),
                           author: new FormControl(null),
                           tag: new FormControl(null),
                           startDate: new FormControl(null),
                           endDate: new FormControl(null)
                         });
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
}
