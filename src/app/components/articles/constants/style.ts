import type { StyleConfig } from '@ckeditor/ckeditor5-style';

export const style: StyleConfig = {
    definitions: [
        {
            name: 'Article category',
            element: 'h3',
            classes: ['category']
        },
        {
            name: 'Title',
            element: 'h2',
            classes: ['document-title']
        },
        {
            name: 'Subtitle',
            element: 'h3',
            classes: ['document-subtitle']
        },
        {
            name: 'Info box',
            element: 'p',
            classes: ['info-box']
        },
        {
            name: 'Side quote',
            element: 'blockquote',
            classes: ['side-quote']
        },
        {
            name: 'Marker',
            element: 'span',
            classes: ['marker']
        },
        {
            name: 'Spoiler',
            element: 'span',
            classes: ['spoiler']
        },
        {
            name: 'Code (dark)',
            element: 'pre',
            classes: ['fancy-code', 'fancy-code-dark']
        },
        {
            name: 'Code (bright)',
            element: 'pre',
            classes: ['fancy-code', 'fancy-code-bright']
        }
    ]
}
