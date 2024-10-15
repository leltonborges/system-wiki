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
               ReactiveFormsModule
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

  readonly dateStart = new FormControl()
  readonly dateEnd = new FormControl()
  readonly dateRangeForm = new FormGroup({
                                           start: new FormControl(),
                                           end: new FormControl()
                                         });

  setYearMonthStart(normalizedYear: Moment,
                    datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dateStart.value ?? moment();
    ctrlValue.year(normalizedYear.year());
    this.dateStart.setValue(ctrlValue);
    datepicker.close();
  }

  setYearMonthEnd(normalizedYear: Moment,
                  datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dateEnd.value ?? moment();
    ctrlValue.year(normalizedYear.year());
    this.dateEnd.setValue(ctrlValue);
    datepicker.close();
  }
}
