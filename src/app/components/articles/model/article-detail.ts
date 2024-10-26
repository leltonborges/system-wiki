export interface ArticleDetail {
  id: string,
  title: string,
  resume: string,
  content: string,
  authorName: string;
  tagName: string;
  linkImg: string;
  dtPublish: string;
  dtCreate: string;
  dtLastUpdate: string;
  yearMonth: number;
}

export type Articles = Array<ArticleDetail>;
