import {
  ChangeDetectionStrategy,
  Component,
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
import _moment, { default as _rollupMoment } from 'moment';
import { MatSelectModule } from '@angular/material/select';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDateFormats } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MessageRef } from '@c/core/common/message-ref';
import { MatTooltipModule } from '@angular/material/tooltip';

const moment = _rollupMoment || _moment;

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
               MatTooltipModule
             ],
             templateUrl: './dashboard-filter.component.html',
             styleUrl: './dashboard-filter.component.sass',
             changeDetection: ChangeDetectionStrategy.OnPush,
             encapsulation: ViewEncapsulation.None,
             providers: [
               provideMomentDateAdapter(FORMAT_YEAR)
             ]
           })
export class DashboardFilterComponent {
  readonly minDate = new Date(2020, 1, 1);
  readonly maxDate = new Date();
  readonly formFilter = this.createdFormGroup();

  constructor(private readonly _messageRef: MessageRef) {}

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
}
