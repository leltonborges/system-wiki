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
import {
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@c/core/confirmation-dialog/confirmation-dialog.component';
import { DialogContent } from '../../../core/model/dialog-content';
import { Article } from '@c/articles/model/article';
import { ArticleService } from '@c/articles/service/article.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private _formBuilder: FormBuilder,
              private _articleService: ArticleService,
              private _snackBar: MatSnackBar) {
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

  private openDialog(content: DialogContent,
                     enterDuration?: number,
                     exitDuration?: number): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog
               .open(ConfirmationDialogComponent,
                     {
                       data: content,
                       enterAnimationDuration: enterDuration,
                       exitAnimationDuration: exitDuration
                     })
  }

  reset() {
    this.openModal('Resfazer tudo',
                   'Tem certezar que deseja desfazer tudo e fazer novamente?')
        .afterClosed()
        .subscribe(result => {
                     if(result) this.stepper.reset();
                   }
        );
  }

  save() {
    this.openModal('Salvar Artigo',
                   'Tem certezar que deseja salvar este artigo?')
        .afterClosed()
        .subscribe((result: boolean) => this.processToSave(result))
  }

  private processToSave(result: boolean) {
    if(result && this.formResume.valid && this.formTitleUrl.valid) {
      const article = this.mountNewArticle();
      this._articleService.save(article)
          .subscribe({
                       next: (result) => {
                         if(result) this.showMessage('Artigo salvo com sucesso!!!');
                         else this.showMessage('Falha ao salvar o artigo!!');
                       },
                       error: (error) => {
                         this.showMessage('Algo deu errado ao salvar o artigo.');
                         console.error('Erro:', error);
                       }
                     });

    }
  }

  private showMessage(msg: string) {
    this._snackBar.open(msg,
                        'Close',
                        {
                          duration: 5000,
                          horizontalPosition: 'end',
                          verticalPosition: 'top'
                        });
  }

  private openModal(title: string,
                    message: string): MatDialogRef<ConfirmationDialogComponent> {
    return this.openDialog({ message, title }, 200, 200);
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
