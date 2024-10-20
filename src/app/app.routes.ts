import { Routes } from '@angular/router';
import { articlesPageResolver } from '@c/articles/resolver/articles.page.resolver';
import { ArticleShowComponent } from '@c/articles/article-show/article-show.component';
import { articleIdResolver } from '@c/articles/resolver/article.id.resolver';
import { ArticleNewComponent } from '@c/articles/article-new/article-new.component';
import { ArticleListComponent } from '@c/articles/article-list/article-list.component';
import { InitComponent } from './init.component';
import { routerParamsGuard } from '@c/articles/guard/router-params.guard';
import { NoFoundComponent } from '@c/no-found/no-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: InitComponent
  },
  {
    path: 'article/new',
    component: ArticleNewComponent
  },
  {
    path: 'article/list',
    component: ArticleListComponent,
    canActivate: [routerParamsGuard],
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
  },
  {
    path: '**',
    component: NoFoundComponent
  }
];
