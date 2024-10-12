import {
  ChangeDetectorRef,
  Component,
  NgZone
} from '@angular/core';
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

  constructor(private readonly loadingService: LoadingService,
              private readonly cdRef: ChangeDetectorRef,
              private readonly zone: NgZone) {
    this.loadingService.loading$.subscribe(isLoading => {
      setTimeout(() => {
        this.zone.run(() => {
          this.isLoading = isLoading;
          this.cdRef.detectChanges();
        });
      });
    });
  }
}
