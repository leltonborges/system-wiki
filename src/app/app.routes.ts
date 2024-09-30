import { Routes } from '@angular/router';
import { ArticleSimpleComponent } from '@c/articles/article-simple/article-simple.component';
import { ArticleListComponent } from '@c/articles/article-list/article-list.component';
import { articlesPageResolver } from '@c/articles/resolver/articles.page.resolver';
import { ArticleShowComponent } from '@c/articles/article-show/article-show.component';
import { articleIdResolver } from '@c/articles/resolver/article.id.resolver';
import { ArticleNewComponent } from '@c/articles/article-new/article-new.component';
import { ArticleEditorComponent } from '@c/articles/article-editor/article-editor.component';

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
    component: ArticleSimpleComponent
  },
  {
    path: 'article/word',
    component: ArticleEditorComponent
  },
  {
    path: 'article/list',
    component: ArticleListComponent,
    resolve: {
      articles: articlesPageResolver
    }
  },
  {
    path: 'article/show/:id',
    component: ArticleShowComponent,
    resolve: {
      article: articleIdResolver
    }
  }
];
