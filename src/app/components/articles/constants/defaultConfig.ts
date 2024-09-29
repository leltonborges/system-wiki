import type { FontFamilyConfig } from '@ckeditor/ckeditor5-font';
import { FontSizeConfig } from 'ckeditor5';
import type { GeneralHtmlSupportConfig } from '@ckeditor/ckeditor5-html-support';
import type { ImageConfig } from '@ckeditor/ckeditor5-image';
import type { LinkConfig } from '@ckeditor/ckeditor5-link';
import type { ListConfig } from '@ckeditor/ckeditor5-list';

export const fontFamily: FontFamilyConfig = {
  supportAllValues: true
}

export const fontSize: FontSizeConfig = {
  options: [10, 12, 14, 'default', 18, 20, 22],
  supportAllValues: true
}
export const language = 'pt-br'

export const htmlSupport: GeneralHtmlSupportConfig = {
  allow: [
    {
      name: /^.*$/,
      styles: true,
      attributes: true,
      classes: true
    }
  ]
}

export const image: ImageConfig = {
  toolbar: [
    'toggleImageCaption',
    'imageTextAlternative',
    '|',
    'imageStyle:inline',
    'imageStyle:wrapText',
    'imageStyle:breakText',
    '|',
    'resizeImage'
  ]
}

export const link: LinkConfig = {
  addTargetToExternalLinks: true,
  defaultProtocol: 'https://',
  decorators: {
    toggleDownloadable: {
      mode: 'manual',
      label: 'Downloadable',
      attributes: {
        download: 'file'
      }
    }
  }
}

export const list: ListConfig = {
  properties: {
    styles: true,
    startIndex: true,
    reversed: true
  }
}
