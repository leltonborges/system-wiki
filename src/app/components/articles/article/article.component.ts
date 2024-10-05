import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  NgIf,
  NgOptimizedImage
} from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Article } from '@c/articles/model/article';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
             selector: 'cs-article',
             standalone: true,
             imports: [MatCardModule, MatButtonModule, NgOptimizedImage, MatIcon, NgIf],
             changeDetection: ChangeDetectionStrategy.OnPush,
             templateUrl: './article.component.html',
             styleUrl: './article.component.sass'
           })
export class ArticleComponent {
  @Input({ alias: 'article', required: true })
  article!: Article;

  constructor(private readonly _router: Router,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _snackBar: MatSnackBar) {}

  openArticle() {
    this._router
        .navigate(['..', 'show', this.article.id],
                  { relativeTo: this._activatedRoute })
        .catch(_ => {
          this._snackBar.open('Failed to navigate to article',
                              'Close',
                              {
                                duration: 5000,
                                horizontalPosition: 'end',
                                verticalPosition: 'top'
                              });
        });
  }
}
