import moment from 'moment';
import {
  momentToYearMonth,
  parseMoment
} from '@c/core/utils/TimeUtils';

export interface Filter {
  title?: string;
  authorName?: string;
  search?: string;
  tagId?: string;
  startDate?: number;
  endDate?: number;
  page: number;
  pageSize: number;
}

export const filterDefault: Filter = {
  page: 0,
  pageSize: 10,
  endDate: momentToYearMonth(moment())
}
export const invalidFilter = (filter: Filter): boolean => {
  if(isPageInvalid(filter?.page)) return true;
  if(isPageSizeInvalid(filter?.pageSize)) return true;
  if(!isDateInvalid(filter?.startDate) && isDateFuture(filter?.startDate!)) return true;
  return isDateInvalid(filter?.endDate);
}

export const isPageInvalid = (page: number | undefined | null): boolean => {
  return page === undefined || page === null || page < 0;
};

export const isPageSizeInvalid = (pageSize: number | undefined | null): boolean => {
  return pageSize === undefined || pageSize === null || pageSize < 10;
};

function isDateFuture(yearMonth: number) {
  return yearMonth > momentToYearMonth(moment());
}

export const isDateInvalid = (yearMonth?: number): boolean => {
  return yearMonth == undefined || isDateFuture(yearMonth);
};

export const reversedDates = (yearMonthStart?: number,
                              yearMonthEnd?: number): boolean => {
  return !isDateInvalid(yearMonthStart) &&
    !isDateInvalid(yearMonthEnd) &&
    parseMoment(yearMonthStart)!.isAfter(parseMoment(yearMonthEnd));
}

export const adjustDates = (startYearMonth?: number,
                            endYearMonth?: number): { startDate?: number, endDate?: number } => {
  if(reversedDates(startYearMonth, endYearMonth)) {
    const temp = startYearMonth!;
    startYearMonth = endYearMonth;
    endYearMonth = temp;
  }

  return { startDate: startYearMonth, endDate: endYearMonth };
};

export const invalidSearchFilter = (search?: string): boolean => {
  return search != null && search.trim().length < 5;
}

export const filterValid = (filter: Filter): Filter => {
  const page: number = isPageInvalid(filter?.page) ? 0 : filter.page;
  const pageSize: number = isPageSizeInvalid(filter?.pageSize) ? 10 : filter.pageSize;
  const endDateFilter: number = isDateInvalid(filter?.endDate) ? momentToYearMonth(moment()) : filter.endDate!;
  const startDateFilter: number | undefined = isDateInvalid(filter?.startDate) ? undefined : filter.startDate;
  const { startDate, endDate } = adjustDates(startDateFilter, endDateFilter);
  const search: string | undefined = invalidSearchFilter(filter.search) ? undefined : filter.search;

  return {
    ...filter,
    startDate,
    endDate,
    page,
    pageSize,
    search
  };
};
