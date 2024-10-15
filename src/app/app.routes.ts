import { Routes } from '@angular/router';
import { ArticleCKEditorComponent } from '@c/articles/article-ckeditor/article-ckeditor.component';
import { articlesPageResolver } from '@c/articles/resolver/articles.page.resolver';
import { ArticleShowComponent } from '@c/articles/article-show/article-show.component';
import { articleIdResolver } from '@c/articles/resolver/article.id.resolver';
import { ArticleNewComponent } from '@c/articles/article-new/article-new.component';
import { ArticleEditorComponent } from '@c/articles/article-editor/article-editor.component';
import { DashboardContentComponent } from '@c/dashboard/content/dashboard-content.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'article/list'
  },
  {
    path: 'article/new',
    component: ArticleNewComponent
  },
  {
    path: 'article/simple',
    component: ArticleCKEditorComponent
  },
  {
    path: 'article/word',
    component: ArticleEditorComponent
  },
  {
    path: 'article/list',
    component: DashboardContentComponent,
    resolve: {
      articles: articlesPageResolver
    }
  },
  {
    path: 'article/show/:articleId',
    component: ArticleShowComponent,
    resolve: {
      article: articleIdResolver
    }
  },
  {
    path: 'article/edit/:articleId',
    component: ArticleNewComponent,
    resolve: {
      article: articleIdResolver
    }
  }
];
