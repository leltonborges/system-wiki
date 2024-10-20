import moment from 'moment';

export interface Filter {
  title?: string;
  author?: string;
  tag?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}

export const filterDefault: Filter = {
  page: 1,
  pageSize: 10,
  endDate: moment().format('YYYYMM')
}

export const filterValid = (filter: Filter): Filter => {
  const page: number = filter.page && filter.page < 1 ? 1 : (filter.page ?? 1);
  const pageSize: number = filter.pageSize && filter.pageSize < 10 ? 10 : (filter.pageSize ?? 10);
  const endDate: string = filter.endDate ?? moment().format('YYYYMM')

  return {
    ...filter,
    endDate,
    page,
    pageSize
  };
};

