import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats
} from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Provider } from '@angular/core';

const DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};


function getPortuguesePaginatorIntl(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Itens por página';
  paginatorIntl.nextPageLabel = 'Próxima página';
  paginatorIntl.previousPageLabel = 'Página anterior';
  paginatorIntl.firstPageLabel = 'Primeira página';
  paginatorIntl.lastPageLabel = 'Última página';
  paginatorIntl.getRangeLabel = (page: number,
                                 pageSize: number,
                                 length: number) => {
    if(length === 0 || pageSize === 0) {
      return `0 de ${ length }`;
    }
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${ startIndex + 1 } - ${ endIndex } de ${ length }`;
  };

  return paginatorIntl;
}

export const providerLocalePT: Provider = { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' };
export const providerDatePT: Provider = { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS };
export const providerPaginatorPT: Provider = { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() }
