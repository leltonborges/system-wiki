import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { ArticleDetail } from '@c/articles/model/article-detail';
import {
  catchError,
  filter,
  map,
  of,
  switchMap
} from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  DatePipe,
  NgIf
} from '@angular/common';
import { IconComponent } from '@c/core/components/icon/icon.component';
import { MatIconButton } from '@angular/material/button';
import { DialogRef } from '@c/core/common/dialog-ref';
import { MessageRef } from '@c/core/common/message-ref';
import {
  ClassicEditor,
  type EditorConfig
} from 'ckeditor5';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { plugins } from '@c/articles/constants/plugins';
import { LoadingComponent } from '@c/core/components/loading/loading.component';
import { LoadingService } from '@c/core/components/loading/loading.service';
import { ArticleService } from '../../../common/service/article.service';

@Component({
             selector: 'cs-article-show',
             standalone: true,
             imports: [
               NgIf,
               IconComponent,
               MatTooltipModule,
               MatIconButton,
               CKEditorModule,
               LoadingComponent,
               DatePipe
             ],
             templateUrl: './article-show.component.html',
             styleUrl: './article-show.component.sass',
             encapsulation: ViewEncapsulation.None
           })
export class ArticleShowComponent
  implements OnInit,
             AfterViewInit {
  article!: ArticleDetail;
  public isLayoutReady = false;
  public Editor = ClassicEditor;
  public config: EditorConfig = {};

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _router: Router,
              private readonly _dialogRef: DialogRef,
              private readonly _messageRef: MessageRef,
              private readonly changeDetector: ChangeDetectorRef,
              private readonly _loadingService: LoadingService,
              private readonly _articleService: ArticleService) {}

  get content(): string {
    return this.article?.content ?? '';
  }

  public ngAfterViewInit(): void {
    this.config = { plugins };
    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
    this._loadingService.hide();
    this.displayMessageAfterSave();
  }

  private displayMessageAfterSave() {
    if(history.state == null) return;
    const isSuccess: boolean = history.state['isSuccess'];
    const isUpdate: boolean = history.state['isUpdate'];
    if(!isSuccess && !isUpdate) return;

    if(isUpdate && isSuccess) this._messageRef.success('Artigo atualizado com sucesso', 10000);
    else if(!isUpdate && isSuccess) this._messageRef.success('Novo artigo criado com sucesso', 10000);
    else this._messageRef.error('Erro ao salvar', 10000);

    history.replaceState({}, '');
  }

  ngOnInit() {
    this._loadingService.show();
    this._activatedRoute
        .data
        .pipe(map(data => data['article']))
        .subscribe((data: ArticleDetail) => {
          this.article = data;
        });
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

  disable() {
    this._dialogRef
        .openDialog({
                      title: 'Excluir',
                      message: 'Deseja realmente excluir?'
                    })
        .afterClosed()
        .pipe(filter((resp: boolean) => resp),
              switchMap(() => this._articleService.disable(this.article.id)),
              catchError(err => {
                console.log('err: ', err)
                console.error(err)
                this._messageRef.error('OPS!! Algo deu errado, tente novamente mais tarde.')
                return of(false);
              }))
        .subscribe({
                     next: result => {
                       if(result) {
                         this._router.navigate([''],
                                               {
                                                 replaceUrl: true,
                                                 queryParamsHandling: 'preserve',
                                                 onSameUrlNavigation: 'reload'
                                               })
                             .catch(() => this._messageRef.error('Failed to navigate to articles'));
                       }
                     }
                   })
  }
}
