import {
  Component,
  inject
} from '@angular/core';
import { SearchComponent } from '@c/navegation/search/search.component';
import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

@Component({
             selector: 'cs-search-modal',
             standalone: true,
             imports: [
               SearchComponent,
               MatDialogModule
             ],
             templateUrl: './search-modal.component.html',
             styleUrl: './search-modal.component.sass'
           })
export class SearchModalComponent {
  readonly dialogRef = inject(MatDialogRef<SearchModalComponent>);

  close(): () => void {
    return () => this.closeModal();
  }

  closeModal(): void {
    this.dialogRef.close(true);
  }
}
