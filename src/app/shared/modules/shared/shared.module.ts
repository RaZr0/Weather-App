import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DateDayNamePipe } from '../../pipes/date-day-name.pipe';
import { TemperaturePipe } from '../../pipes/temperature.pipe';



@NgModule({
  declarations: [DateDayNamePipe, TemperaturePipe],
  imports: [CommonModule],
  exports: [CommonModule, DateDayNamePipe, TemperaturePipe],
  providers: [DecimalPipe]
})
export class SharedModule { }
