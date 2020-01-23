import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dateDayName'})
export class DateDayNamePipe implements PipeTransform {
  transform(date: string): string {
    return new Date(date).toString().substring(0,3);
  }
}