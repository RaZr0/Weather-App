import { Component, OnInit, Input } from '@angular/core';
import { DailyForecast } from '../../models/daily-forecast.model';
import { TemperatureUnit } from '../../../../shared/models/temperature.model';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent implements OnInit {

  @Input() dailyForecast: DailyForecast

  constructor() {
   
  }

  ngOnInit() {
  }

}
