import {
  Component,
  inject,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ArticleCKEditorComponent } from '@c/articles/article-ckeditor/article-ckeditor.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatStepper,
  MatStepperModule
} from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { imageUrlValidator } from '@c/articles/validator/image-url.validator';
import { MatDialog } from '@angular/material/dialog';
import { Article } from '@c/articles/model/article';
import { ArticleService } from '@c/articles/service/article.service';
import { DialogRef } from '@c/core/common/dialog-ref';
import { MessageRef } from '@c/core/common/message-ref';

@Component({
             selector: 'cs-article-new',
             standalone: true,
             imports: [MatSelectModule,
                       MatInputModule,
                       MatFormFieldModule,
                       ReactiveFormsModule,
                       MatTooltipModule,
                       MatStepperModule,
                       MatButtonModule,
                       MatIconModule,
                       ArticleCKEditorComponent],
             templateUrl: './article-new.component.html',
             styleUrl: './article-new.component.sass'
           })
export class ArticleNewComponent {
  private readonly dialog = inject(MatDialog);
  @ViewChild('stepper')
  private readonly stepper!: MatStepper;
  @ViewChild('articleCKEditor')
  private readonly articleCKEditor!: ArticleCKEditorComponent;
  formTitleUrl!: FormGroup;
  formResume!: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _articleService: ArticleService,
              private readonly _messageRef: MessageRef,
              private readonly _dialogRef: DialogRef) {
    this.formTitleUrl = this.createFormTitleURL();
    this.formResume = this.createdFormResume()
  }

  private createdFormResume(): FormGroup {
    return this._formBuilder
               .group(
                 {
                   resume: new FormControl(''),
                   tag: new FormControl('', [Validators.required])
                 }
               )
  }

  titleErrorMessage(): string {
    const { title } = this.formTitleUrl.controls;
    if(title.touched) {
      if(title.hasError('required')) return ('Titulo é obrigatório.')
      else if(title.hasError('minlength')) return ('O minimo 5 carecteres')
      else if(title.hasError('pattern')) return ('Titulo invalido')
    }
    return '';
  }

  reset() {
    this._dialogRef.openDialog({
                                 title: 'Resfazer tudo',
                                 message: 'Tem certezar que deseja desfazer tudo e fazer novamente?'
                               })
        .afterClosed()
        .subscribe(result => {
                     if(result) this.stepper.reset();
                   }
        );
  }

  save() {
    this._dialogRef.openDialog({
                                 title: 'Salvar Artigo',
                                 message: 'Tem certezar que deseja salvar este artigo?'
                               })
        .afterClosed()
        .subscribe((result: boolean) => this.processToSave(result))
  }

  private processToSave(result: boolean) {
    if(result && this.formResume.valid && this.formTitleUrl.valid) {
      const article = this.mountNewArticle();
      this._articleService.save(article)
          .subscribe({
                       next: (result) => {
                         if(result) this._messageRef.success('Artigo salvo com sucesso!!!');
                         else this._messageRef.error('Falha ao salvar o artigo!!');
                       },
                       error: (error) => {
                         this._messageRef.error('Algo deu errado ao salvar o artigo.');
                         console.error('Erro:', error);
                       }
                     });

    }
  }

  private mountNewArticle(): Article {
    const { title, url } = this.formTitleUrl.controls;
    const { resume, tag } = this.formResume.controls;
    return {
      author: 'Jose Arnaldo',
      content: this.articleCKEditor.articleData,
      linkImg: url?.value,
      resume: resume?.value,
      dtPublication: new Date().toLocaleDateString(),
      tag: tag.value,
      title: title.value

    }
  }

  urlErrorMessage(): string {
    const { url } = this.formTitleUrl.controls;
    if(url.touched) {
      if(url.hasError('required')) return ('URL é obrigatório.')
      else if(url.hasError('invalidImageUrl')) return ('URL invalido')
    }
    return ''
  }

  tagErrorMessage(): string {
    const { tag } = this.formResume.controls;
    if(tag.touched && tag.hasError('required')) return 'Campo obrigatório.'
    return ''
  }

  private createFormTitleURL(): FormGroup {
    return this._formBuilder.group(
      {
        title: new FormControl('', [Validators.required,
                                    Validators.minLength(5),
                                    Validators.pattern(/[A-Za-z0-9]/)]),
        url: new FormControl('', [Validators.required, imageUrlValidator()])
      }
    )
  }
}
