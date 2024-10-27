import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  Tag,
  Tags
} from '@c/navegation/model/tag';

@Component({
             selector: 'cs-select-tag',
             standalone: true,
             imports: [ReactiveFormsModule,
                       NgIf,
                       MatAutocompleteModule,
                       MatInputModule,
                       MatTooltipModule
             ],
             templateUrl: './select-tag.component.html',
             styleUrl: './select-tag.component.sass'
           })
export class SelectTagComponent
  implements OnInit {
  @ViewChild('inputTag')
  inputTag!: ElementRef<HTMLInputElement>;
  @Input({ alias: 'key', required: true })
  keyField!: keyof Tag
  @Input({ alias: 'value', required: true })
  valueField!: keyof Tag
  @Input({ alias: 'tagFormControl' })
  tagFormControl: FormControl = new FormControl('');
  @Input({ alias: 'hasError' })
  hasError: boolean = false;

  @Input({ alias: 'tags', required: true })
  _tags!: Tags

  private _tagsOptions!: Tags

  ngOnInit(): void {
    this._tagsOptions = this._tags
  }

  get tagsOptions(): Tags {
    return this._tagsOptions;
  }

  filterTag(): void {
    const filterValue = this.inputTag.nativeElement.value.toLowerCase();
    this._tagsOptions = this._tags.filter(o => o.name.toLowerCase().includes(filterValue));
  }

  tagErrorMessage(): string {
    if(this.tagFormControl.touched && this.tagFormControl.hasError('required'))
      return 'Campo obrigatório.'
    return ''
  }
}
