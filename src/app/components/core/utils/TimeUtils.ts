import {
    debounceTime,
    MonoTypeOperatorFunction
} from 'rxjs';

export const DEFAULT_DEBOUNCE_TIME = 1000;

export const debounceTimeFilter: <T>() => MonoTypeOperatorFunction<T> = <T>() => debounceTime<T>(DEFAULT_DEBOUNCE_TIME);
