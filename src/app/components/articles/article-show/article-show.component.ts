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
import { map } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import { IconComponent } from '@c/core/icon/icon.component';
import { MatIconButton } from '@angular/material/button';
import { DialogRef } from '@c/core/common/dialog-ref';
import { MessageRef } from '@c/core/common/message-ref';
import {
  ClassicEditor,
  type EditorConfig
} from 'ckeditor5';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { plugins } from '@c/articles/constants/plugins';
import { LoadingComponent } from '@c/core/loading/loading.component';
import { LoadingService } from '@c/core/loading/loading.service';

@Component({
             selector: 'cs-article-show',
             standalone: true,
             imports: [
               NgIf,
               IconComponent,
               MatTooltipModule,
               MatIconButton,
               CKEditorModule,
               LoadingComponent
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
              private readonly _loadingService: LoadingService) {}

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
}
