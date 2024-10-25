import { Articles } from '@c/articles/model/article-detail';

export interface PageArticles {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  data: Articles;
}
