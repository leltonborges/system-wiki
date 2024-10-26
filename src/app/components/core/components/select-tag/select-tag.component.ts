import {
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import {
  MatError,
  MatFormField,
  MatLabel
} from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import {
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { NgIf } from '@angular/common';
import {
  MatAutocomplete,
  MatAutocompleteTrigger
} from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';
import {
  Tag,
  Tags
} from '@c/navegation/model/tag';

@Component({
             selector: 'cs-select-tag',
             standalone: true,
             imports: [
               MatError,
               MatFormField,
               MatLabel,
               MatOption,
               MatSelect,
               ReactiveFormsModule,
               NgIf,
               MatAutocomplete,
               MatAutocompleteTrigger,
               MatInput,
               MatTooltip
             ],
             templateUrl: './select-tag.component.html',
             styleUrl: './select-tag.component.sass'
           })
export class SelectTagComponent {

  @ViewChild('inputTag')
  inputTag!: ElementRef<HTMLInputElement>;
  @Input({ alias: 'key', required: true })
  keyField!: keyof Tag
  @Input({ alias: 'value', required: true })
  valueField!: keyof Tag
  private readonly _tagFormControl: FormControl = new FormControl('');

  private _tags!: Tags

  @Input({ alias: 'tags', required: true })
  set tags(tags: Tags) {
    this._tags = tags
    this._tagsOptions = tags
  }

  private _tagsOptions!: Tags

  get tagsOptions(): Tags {
    return this._tagsOptions;
  }

  get tagFormControl(): FormControl {
    return this._tagFormControl;
  }

  filterTag(): void {
    const filterValue = this.inputTag.nativeElement.value.toLowerCase();
    this._tagsOptions = this._tags.filter(o => o.name.toLowerCase().includes(filterValue));
  }
}
