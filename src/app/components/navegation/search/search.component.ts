import {
  Component,
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
  NgIf,
  NgTemplateOutlet
} from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
             selector: 'cs-search',
             standalone: true,
             imports: [
               ReactiveFormsModule,
               MatTooltipModule,
               MatIcon,
               NgIf,
               NgTemplateOutlet
             ],
             templateUrl: './search.component.html',
             styleUrl: './search.component.sass'
           })
export class SearchComponent
  implements OnInit {
  readonly inputSearch = new FormControl();
  @Input({ alias: 'modal' })
  isModal: boolean = false;
  private readonly _debounce$: Subject<string> = new Subject<string>();
  @Input() listener!: () => void;

  constructor(private readonly _route: Router) {}

  get debounce$(): Subject<string> {
    return this._debounce$;
  }

  ngOnInit(): void {
    this.debounce$.pipe(filter(res => !!res && res.length > 5),
                        debounceTime(3000))
        .subscribe(result => {
          this.searchArticles(result).then(this.listener).catch(console.error)
        });
  }

  private searchArticles(result: string) {
    return this._route.navigate(['/article', 'list'], { queryParams: { search: result } });
  }
}
