import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
             selector: 'cs-init',
             standalone: true,
             imports: [],
             template: ''
           })
export class InitComponent
  implements OnInit {
  constructor(private readonly _router: Router) {
  }

  ngOnInit(): void {
    this._router.navigate(['/article', 'list'])
        .catch(console.error);
  }
}
