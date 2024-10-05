import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '@c/core/loading/loading.service';
import { NgIf } from '@angular/common';

@Component({
             selector: 'cs-loading',
             standalone: true,
             imports: [MatProgressSpinnerModule, NgIf],
             templateUrl: './loading.component.html',
             styleUrl: './loading.component.sass'
           })
export class LoadingComponent {
  isLoading = false;

  constructor(private readonly loadingService: LoadingService) {
    this.loadingService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}
