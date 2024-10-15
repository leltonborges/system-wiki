import { Component } from '@angular/core';
import { ArticleListComponent } from '@c/articles/article-list/article-list.component';
import { DashboardFilterComponent } from '@c/dashboard/filter/dashboard-filter.component';

@Component({
             selector: 'cs-dashboard-content',
             standalone: true,
             imports: [
               ArticleListComponent,
               DashboardFilterComponent
             ],
             templateUrl: './dashboard-content.component.html',
             styleUrl: './dashboard-content.component.sass'
           })
export class DashboardContentComponent {

}
