import { Articles } from '@c/articles/model/article';

export interface PageArticles {
  last: boolean;
  pages: number;
  items: number;
  data: Articles;
}
