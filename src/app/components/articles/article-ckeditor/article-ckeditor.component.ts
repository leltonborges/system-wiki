import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation
} from '@angular/core';
import {
  CommonModule,
  NgIf
} from '@angular/common';
import {
  ChangeEvent,
  CKEditorModule
} from '@ckeditor/ckeditor5-angular';

import {
  ClassicEditor,
  type EditorConfig
} from 'ckeditor5';

import translations from 'ckeditor5/translations/pt-br.js';
import { plugins } from '@c/articles/constants/plugins';
import { toolbar } from '@c/articles/constants/toolbar';
import { blockToolbar } from '@c/articles/constants/blockToolbar';
import { heading } from '@c/articles/constants/heading';
import { style } from '@c/articles/constants/style';
import { table } from '@c/articles/constants/table';
import { balloonToolbar } from '@c/articles/constants/balloonToolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {
  fontFamily,
  fontSize,
  htmlSupport,
  image,
  language,
  link,
  list
} from '@c/articles/constants/defaultConfig';
import { FormsModule } from '@angular/forms';

@Component({
             selector: 'cs-article-ckeditor',
             standalone: true,
             imports: [NgIf, CKEditorModule, MatButtonModule, MatDividerModule, MatIconModule, FormsModule],
             templateUrl: './article-ckeditor.component.html',
             styleUrls: ['./article-ckeditor.component.sass'],
             encapsulation: ViewEncapsulation.None
           })
export class ArticleCKEditorComponent
  implements AfterViewInit {

  constructor(private changeDetector: ChangeDetectorRef) {}

  public isLayoutReady = false;
  public Editor = ClassicEditor;
  public config: EditorConfig = {};
  public articleData = '<h2>Abraçando Inovações</h2><p>Cada nova ideia é uma porta aberta para oportunidades ilimitadas.</p>';

  public ngAfterViewInit(): void {
    this.config = {
      toolbar,
      plugins,
      balloonToolbar,
      blockToolbar,
      fontFamily,
      fontSize,
      heading,
      htmlSupport,
      image,
      language,
      link,
      list,
      menuBar: {
        isVisible: true
      },
      placeholder: 'Type or paste your content here!',
      style,
      table,
      translations: [translations]
    };

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
  }
}
