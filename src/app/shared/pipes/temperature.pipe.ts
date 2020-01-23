import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';


@Pipe({ name: 'temperature' })
export class TemperaturePipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {

  }
  transform(value: number, unit?: string): string {
    return `${this.decimalPipe.transform(value, '.0-0')}°${unit === 'C' ? 'C' : 'F'}`
  }
}