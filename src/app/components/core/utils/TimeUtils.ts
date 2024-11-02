import {
    debounceTime,
    MonoTypeOperatorFunction
} from 'rxjs';
import { AbstractControl } from '@angular/forms';
import moment, { Moment } from 'moment/moment';

export const DEFAULT_DEBOUNCE_TIME = 1000;
export const FORMAT_YEARMONTH = 'YYYYMM';

export const debounceTimeFilter: <T>() => MonoTypeOperatorFunction<T> = <T>() => debounceTime<T>(DEFAULT_DEBOUNCE_TIME);


export function parseYearMonth(moment: AbstractControl<Moment>): number | undefined {
    return moment.value ? momentToYearMonth(moment.value) : undefined;
}

export function momentToYearMonth(moment: Moment): number {
    return parseInt(moment.format(FORMAT_YEARMONTH));
}

export function parseMoment(yearMonth?: number): Moment | undefined {
    return yearMonth ? moment(yearMonth, FORMAT_YEARMONTH) : undefined;
}
