import {
    Component,
    OnInit
} from '@angular/core';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import moment from 'moment';
import { Filter } from './common/interface/Filter';

@Component({
               selector: 'cs-init',
               standalone: true,
               imports: [],
               template: ''
           })
export class InitComponent
    implements OnInit {
    constructor(private readonly _router: Router,
                private readonly _activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        const { title, author, startDate, endDate, page, pageSize } = this._activatedRoute.snapshot.queryParams;
        const filter: Filter = {
            title,
            author,
            startDate,
            endDate: endDate ?? moment().format('YYYYMM'),
            page: page ?? 0,
            pageSize: pageSize ?? 10
        }
        this._router.navigate(['/article', 'list'], { queryParams: filter })
            .catch(console.error);
    }
}
