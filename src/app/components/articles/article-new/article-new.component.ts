import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation
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
import { Article } from '@c/articles/model/article';
import { ArticleService } from '../../../common/service/article.service';
import { DialogRef } from '@c/core/common/dialog-ref';
import { MessageRef } from '@c/core/common/message-ref';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { map } from 'rxjs';
import { LoadingComponent } from '@c/core/loading/loading.component';
import { LoadingService } from '@c/core/loading/loading.service';

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
                       ArticleCKEditorComponent,
                       LoadingComponent],
             templateUrl: './article-new.component.html',
             styleUrl: './article-new.component.sass',
             encapsulation: ViewEncapsulation.None
           })
export class ArticleNewComponent
  implements OnInit,
             AfterViewInit {
  @ViewChild('stepper')
  private readonly stepper!: MatStepper;
  @ViewChild('articleCKEditor')
  private readonly articleCKEditor!: ArticleCKEditorComponent;
  formTitleUrl!: FormGroup;
  formResume!: FormGroup;
  private editArticle!: Article;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _articleService: ArticleService,
              private readonly _loadingService: LoadingService,
              private readonly _router: ActivatedRoute,
              private readonly _route: Router,
              private readonly _messageRef: MessageRef,
              private readonly _dialogRef: DialogRef) {
  }

  get contentArticle(): string {
    return this.editArticle?.content ?? '';
  }

  ngAfterViewInit(): void {
    this.urlErrorMessage();
    this.tagErrorMessage();
    this.titleErrorMessage()
  }

  ngOnInit(): void {
    this._router
        .data
        .pipe(map(data => data['article']))
        .subscribe({
                     next: (data: Article) => {
                       this.editArticle = data;
                       this._loadingService.hide()
                     },
                     error: () => {
                       this._loadingService.hide()
                       this._messageRef.error('Erro ao carregar o artigo.');
                     }
                   });
    this.formTitleUrl = this.createFormTitleURL();
    this.formResume = this.createdFormResume()
  }

  private createdFormResume(): FormGroup {
    return this._formBuilder
               .group(
                 {
                   resume: new FormControl(this.editArticle?.resume),
                   tag: new FormControl(this.editArticle?.tag, [Validators.required])
                 }
               )
  }

  private createFormTitleURL(): FormGroup {
    return this._formBuilder.group(
      {
        title: new FormControl(this.editArticle?.title, [Validators.required,
                                                         Validators.minLength(5),
                                                         Validators.pattern(/[A-Za-z0-9]/)]),
        url: new FormControl(this.editArticle?.linkImg, [Validators.required, imageUrlValidator()])
      }
    )
  }

  private processToSave(result: boolean) {
    if(result && this.formResume.valid && this.formTitleUrl.valid) {
      const article = this.mountNewArticle();
      this._articleService.save(article)
          .subscribe({
                       next: result => {
                         this._route.navigate(['/', 'article', 'show', result.id],
                                              {
                                                state: {
                                                  isSuccess: !!result,
                                                  isUpdate: this._router.snapshot.url.find(url => url.path == 'edit') !== undefined
                                                }
                                              })
                             .catch(() => this._messageRef.error('Falha ao salvar o artigo!!'));
                       },
                       error: (error) => {
                         this._messageRef.error('Falha ao salvar o artigo!!')
                       }
                     });

    }
  }


  private mountNewArticle(): Article {
    const { title, url } = this.formTitleUrl.controls;
    const { resume, tag } = this.formResume.controls;
    return {
      id: this.editArticle?.id,
      author: 'Jose Arnaldo',
      content: this.articleCKEditor.articleData,
      linkImg: url?.value,
      resume: resume?.value,
      dtPublication: new Date().toLocaleDateString(),
      tag: tag.value,
      title: title.value
    }
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

}
