import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ArticleSimpleComponent } from '@c/articles/article-simple/article-simple.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { imageUrlValidator } from '@c/articles/validator/image-url.validator';

@Component({
             selector: 'cs-article-new',
             standalone: true,
             imports: [MatSelectModule,
                       MatInputModule,
                       MatFormFieldModule,
                       ReactiveFormsModule,
                       MatTooltipModule,
                       MatStepperModule,
                       MatButtonModule,
                       ArticleSimpleComponent],
             templateUrl: './article-new.component.html',
             styleUrl: './article-new.component.sass'
           })
export class ArticleNewComponent {
  formURL!: FormGroup;
  formResume!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
     this.formURL = this.createFormURL();
     this.formResume = this.createdFormResume()
  }
  private createdFormResume(): FormGroup {
    return this._formBuilder
               .group(
                 {
                   resume: new FormControl('', [Validators.required]),
                   tag: new FormControl('#DevOps', [Validators.required])
                 }
               )
  }

  private createFormURL(): FormGroup {
    return this._formBuilder.group(
      {
        url: new FormControl('', [Validators.required, imageUrlValidator()]),
      }
    )
  }

  getError(inputName: string,
           errorName: string): boolean {
    return this.formURL.get(inputName)?.errors?.[errorName];
  }

  isTouched(inputName: string): boolean | undefined {
    return this.formURL.get(inputName)?.touched;
  }

}
