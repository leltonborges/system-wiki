import { Articles } from '@c/articles/model/article-detail';

export interface PageArticles {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  data: Articles;
}

export const pageEmpty: PageArticles = {
  currentPage: 0,
  totalPages: 0,
  data: [],
  totalCount: 0
};
