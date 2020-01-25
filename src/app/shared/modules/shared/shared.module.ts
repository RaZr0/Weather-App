import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DateDayNamePipe } from '../../pipes/date-day-name.pipe';
import { TemperaturePipe } from '../../pipes/temperature.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GeneralDialogComponent } from '../../components/dialogs/general-dialog/general-dialog.component';
import { TechnicalErrorDialogComponent } from '../../components/dialogs/technical-error-dialog/technical-error-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
    DateDayNamePipe,
    TemperaturePipe,
    GeneralDialogComponent,
    TechnicalErrorDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTooltipModule,
    MatSlideToggleModule
  ],
  exports: [
    CommonModule,
    DateDayNamePipe,
    TemperaturePipe,
    MatDialogModule,
    MatTooltipModule,
    MatSlideToggleModule
  ],
  providers: [
    DecimalPipe
  ],
  entryComponents: [GeneralDialogComponent, TechnicalErrorDialogComponent]
})
export class SharedModule { }
