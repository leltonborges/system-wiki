export interface Article {
  id?: string,
  title: string,
  resume?: string,
  content: string,
  author: string;
  tag: string;
  dtPublication: string;
  linkImg?: string;
}

export type Articles = Array<Article>;
