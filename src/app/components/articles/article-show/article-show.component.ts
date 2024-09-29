import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '@c/articles/model/article';
import { map } from 'rxjs';
import {
  DomSanitizer,
  SafeHtml
} from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';

@Component({
             selector: 'cs-article-show',
             standalone: true,
             imports: [
               NgOptimizedImage
             ],
             templateUrl: './article-show.component.html',
             styleUrl: './article-show.component.sass'
           })
export class ArticleShowComponent
  implements OnInit {
  article!: Article;

  constructor(private sanitizer: DomSanitizer,
              private route: ActivatedRoute) {}

  ngOnInit() {
      this.route
          .data
          .pipe(map(data => data['article']))
          .subscribe((data: Article) => {
            this.article = data;
          });
  }

  renderSafeHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.article.content);
  }
}
