import {
  Component,
  inject,
  Input,
  OnInit
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import {
  debounceTime,
  filter,
  Subject
} from 'rxjs';
import { Router } from '@angular/router';
import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { NgIf } from '@angular/common';

@Component({
             selector: 'cs-search',
             standalone: true,
             imports: [
               ReactiveFormsModule,
               MatDialogModule,
               MatIcon,
               NgIf
             ],
             templateUrl: './search.component.html',
             styleUrl: './search.component.sass'
           })
export class SearchComponent
  implements OnInit {
  readonly dialogRef = inject(MatDialogRef<SearchComponent>)
  readonly inputSearch = new FormControl();
  @Input({ alias: 'modal' })
  isModal!: boolean;
  private readonly _debounce$: Subject<string> = new Subject<string>();

  constructor(private readonly _route: Router) {}

  get debounce$(): Subject<string> {
    return this._debounce$;
  }

  ngOnInit(): void {
    this.isModal = window.innerWidth <= 550;
    this.debounce$.pipe(filter(res => !!res && res.length > 5),
                        debounceTime(3000))
        .subscribe(result => {
          this.searchArticles(result).catch(console.error)
          this.isModal && this.dialogRef.close(true)
        });
  }

  private searchArticles(result: string) {
    return this._route.navigate(['/article', 'list'], { queryParams: { search: result } });
  }
}
