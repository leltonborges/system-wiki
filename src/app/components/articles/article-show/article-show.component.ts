import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Article } from '@c/articles/model/article';
import { map } from 'rxjs';
import {
  DomSanitizer,
  SafeHtml
} from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import { IconComponent } from '@c/core/icon/icon.component';
import { MatIconButton } from '@angular/material/button';
import { DialogRef } from '@c/core/common/dialog-ref';
import { MessageRef } from '@c/core/common/message-ref';

@Component({
             selector: 'cs-article-show',
             standalone: true,
             imports: [
               NgIf,
               IconComponent,
               MatTooltipModule,
               MatIconButton
             ],
             templateUrl: './article-show.component.html',
             styleUrl: './article-show.component.sass'
           })
export class ArticleShowComponent
  implements OnInit {
  article!: Article;

  constructor(private readonly _sanitizer: DomSanitizer,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _router: Router,
              private readonly _dialogRef: DialogRef,
              private readonly _messageRef: MessageRef) {}

  ngOnInit() {
    this._activatedRoute
        .data
        .pipe(map(data => data['article']))
        .subscribe((data: Article) => {
          this.article = data;
        });
  }

  renderSafeHtml(): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(this.article.content);
  }

  edit() {
    this._dialogRef
        .openDialog({
                      title: 'Editar',
                      message: 'Deseja realmente editar?'
                    })
        .afterClosed()
        .subscribe({
                     next: result => {
                       if(result) {
                         this._router.navigate(['/', 'article', 'edit', this.article.id])
                             .catch(() => this._messageRef.error('Failed to navigate to article'));
                       }
                     }
                   })
  }
}
