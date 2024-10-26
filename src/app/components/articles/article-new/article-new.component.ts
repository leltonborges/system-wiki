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
import { ArticleDetail } from '@c/articles/model/article-detail';
import { ArticleService } from '../../../common/service/article.service';
import { DialogRef } from '@c/core/common/dialog-ref';
import { MessageRef } from '@c/core/common/message-ref';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { map } from 'rxjs';
import { LoadingComponent } from '@c/core/components/loading/loading.component';
import { LoadingService } from '@c/core/components/loading/loading.service';
import { ArticleNew } from '@c/articles/model/article-new';
import { ErrorResponse } from '../../../common/interface/error-response';
import { HttpErrorResponse } from '@angular/common/http';
import { SelectTagComponent } from '@c/core/components/select-tag/select-tag.component';
import { TagService } from '../../../common/service/tag.service';
import { Tags } from '@c/navegation/model/tag';

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
                       LoadingComponent, SelectTagComponent],
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
  private editArticle!: ArticleDetail;
  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _articleService: ArticleService,
              private readonly _loadingService: LoadingService,
              private readonly _router: ActivatedRoute,
              private readonly _route: Router,
              private readonly _messageRef: MessageRef,
              private readonly _tagService: TagService,
              private readonly _dialogRef: DialogRef) {
    this.formTitleUrl = this.createFormTitleURL();
    this.formResume = this.createdFormResume()
  }

  private _tags!: Tags;

  get contentArticle(): string {
    return this.editArticle?.content ?? '';
  }

  ngAfterViewInit(): void {
    this.urlErrorMessage();
    this.titleErrorMessage()
  }

  get tags(): Tags {
    return this._tags;
  }

  get tagFormControl(): FormControl {
    const { tag } = this.formResume.controls;
    return tag as FormControl;
  }

  ngOnInit(): void {
    this._router
        .data
        .pipe(map(data => data['article']))
        .subscribe({
                     next: (data: ArticleDetail) => {
                       this.editArticle = data;
                       this._loadingService.hide()
                     },
                     error: () => {
                       this._loadingService.hide()
                       this._messageRef.error('Erro ao carregar o artigo.');
                     }
                   });
    this._tagService.findAllTags()
        .subscribe(result => this._tags = result);
  }

  private createdFormResume(): FormGroup {
    return this._formBuilder
               .group(
                 {
                   resume: new FormControl(this.editArticle?.resume),
                   tag: new FormControl(this.editArticle?.tagName, [Validators.required])
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
      if(this.editArticle?.id) {
        this._articleService.update(this.editArticle.id, article)
            .subscribe(this.handleSaveResult())
      } else {
        console.table(article)
        this._articleService.save(article)
            .subscribe(this.handleSaveResult());
      }
    }
  }

  private handleSaveResult() {
    return {
      next: (result: ArticleDetail) => {
        this._route.navigate(['/', 'article', 'show', result.id],
                             {
                               state: {
                                 isSuccess: !!result,
                                 isUpdate: this._router.snapshot.url.find(url => url.path == 'edit') !== undefined
                               }
                             })
            .catch(() => this._messageRef.error('Falha na navegação!!'));
      },
      error: (err: HttpErrorResponse) => {
        const error = err.error as ErrorResponse;
        if(error.fields) this._messageRef.errorFields(error.fields)
        else this._messageRef.error(error.message)
      }
    };
  }

  private mountNewArticle(): ArticleNew {
    const { title, url } = this.formTitleUrl.controls;
    const { resume, tag } = this.formResume.controls;
    return {
      idAuthor: '671ab02f24492e4fdc91465d',
      content: this.articleCKEditor.articleData,
      linkImg: url?.value,
      resume: resume?.value,
      idTag: tag.value,
      title: title.value,
      dtPublish: new Date(),
      dtLastUpdate: new Date(),
      dtCreate: new Date(),
      status: 1
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
}
