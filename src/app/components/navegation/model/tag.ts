export interface Tag {
  id: string;
  name: string;
}

export type Tags = Array<Tag>
export type TagsPage = {
  data: Tags;
  currentPage: number;
  totalPages: number;
  totalCount: number;
}
