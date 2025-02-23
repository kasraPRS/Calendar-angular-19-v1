import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, format: string = 'dd/MM/yyyy'): string | null {
    if (!value) return null;

    // Ensure the value is a valid Date object
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      // If it's not a valid date, return null
      return null;
    }

    // Define the date formatting
    const options: Intl.DateTimeFormatOptions = {};

    switch (format) {
      case 'dd/MM/yyyy':
        options.year = 'numeric';
        options.month = '2-digit';
        options.day = '2-digit';
        break;
      case 'MM/dd/yyyy':
        options.year = 'numeric';
        options.month = '2-digit';
        options.day = '2-digit';
        break;
      case 'yyyy-MM-dd':
        options.year = 'numeric';
        options.month = '2-digit';
        options.day = '2-digit';
        break;
      case 'full':
        options.year = 'numeric';
        options.month = 'long';
        options.day = 'numeric';
        break;
      case 'short':
        options.year = '2-digit';
        options.month = 'short';
        options.day = '2-digit';
        break;
      case 'dd':
        options.day = '2-digit';
        break;
      default:
        // Default to 'dd/MM/yyyy' if no matching format is provided
        options.year = 'numeric';
        options.month = '2-digit';
        options.day = '2-digit';
        break;
    }

    return date.toLocaleDateString('en-US', options);
  }
}
