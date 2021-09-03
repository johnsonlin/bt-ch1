import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstName'
})
export class FirstNamePipe implements PipeTransform {
  // reference: https://en.wikipedia.org/wiki/Title
  commonTitles = [
    'Mr.',
    'Mrs.',
    'Ms.',
    'Mx.',
    'Miss',
    'Master',
    'Maid',
    'Madam',
    'Madame',
  ]

  transform(value: string): string {
    if (!value) {
      return value;
    }

    const nameInChunks = value.trim().split(' ');
    const hasTitle = this.commonTitles.includes(nameInChunks[0].trim());

    if (hasTitle) {
      return nameInChunks[1];
    }

    return nameInChunks[0];
  }
}
