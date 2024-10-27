export interface ArticleDetail {
  id: string,
  title: string,
  resume: string,
  content: string,
  authorName: string;
  tagName: string;
  linkImg: string;
  dtPublish: Date;
  dtCreate: Date;
  dtLastUpdate: Date;
  yearMonth: number;
}

export type Articles = Array<ArticleDetail>;
