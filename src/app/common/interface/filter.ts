import moment from 'moment';

export interface Filter {
  title?: string;
  authorName?: string;
  search?: string;
  tagId?: string;
  startDate?: string;
  endDate?: string;
  page: number;
  pageSize: number;
}

export const filterDefault: Filter = {
  page: 1,
  pageSize: 10,
  endDate: moment().format('YYYYMM')
}
export const invalidFilter = (filter: Filter): boolean => {
  if(isPageInvalid(filter?.page)) return true;
  if(isPageSizeInvalid(filter?.pageSize)) return true;
  if(!isDateInvalid(filter?.startDate) && isDateFuture(filter?.startDate!)) return true;
  return isDateInvalid(filter?.endDate);
}

export const isPageInvalid = (page: number | undefined | null): boolean => {
  return page === undefined || page === null || page < 1;
};

export const isPageSizeInvalid = (pageSize: number | undefined | null): boolean => {
  return pageSize === undefined || pageSize === null || pageSize < 10;
};

function isDateFuture(date: string) {
  return date > moment().format('YYYYMM');
}

export const isDateInvalid = (date: string | undefined | null): boolean => {
  return date === undefined || date === null || isDateFuture(date);
};

export const reversedDates = (startDate: string | undefined,
                              endDate: string): boolean => {
  return !isDateInvalid(startDate) && moment(startDate, 'YYYYMM').isAfter(moment(endDate, 'YYYYMM'));
}

export const adjustDates = (startDate: string | undefined,
                            endDate: string): { startDate: string | undefined, endDate: string } => {
  if(reversedDates(startDate, endDate)) {
    const temp = startDate!;
    startDate = endDate;
    endDate = temp;
  }

  return { startDate, endDate };
};

export const filterValid = (filter: Filter): Filter => {
  const page: number = isPageInvalid(filter?.page) ? 1 : filter.page!;
  const pageSize: number = isPageSizeInvalid(filter?.pageSize) ? 10 : filter.pageSize!;
  const endDateFilter: string = isDateInvalid(filter?.endDate) ? moment().format('YYYYMM') : filter.endDate!;
  const startDateFilter: string | undefined = isDateInvalid(filter?.startDate) ? undefined : filter.startDate;
  const { startDate, endDate } = adjustDates(startDateFilter, endDateFilter);

  return {
    ...filter,
    startDate,
    endDate,
    page,
    pageSize
  };
};
