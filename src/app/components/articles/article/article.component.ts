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
import { ArticleDetail } from '@c/articles/model/article-detail';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { MessageRef } from '@c/core/common/message-ref';
import { IconSvgComponent } from '@c/core/components/icon-svg/icon-svg.component';

@Component({
             selector: 'cs-article',
             standalone: true,
             imports: [MatCardModule, MatButtonModule, NgOptimizedImage, MatIcon, NgIf, IconSvgComponent],
             changeDetection: ChangeDetectionStrategy.OnPush,
             templateUrl: './article.component.html',
             styleUrl: './article.component.sass'
           })
export class ArticleComponent {
  @Input({ alias: 'article', required: true })
  article!: ArticleDetail;

  constructor(private readonly _router: Router,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _messageRef: MessageRef) {}

  openArticle() {
    this._router
        .navigate(['..', 'show', this.article.id],
                  { relativeTo: this._activatedRoute })
        .catch(_ => {
          this._messageRef.error('Failed to navigate to article');
        });
  }

  getResumeOrTitle(): string {
    return this.article.resume.length < 5 ? this.article.title : this.article.resume
  }
}
