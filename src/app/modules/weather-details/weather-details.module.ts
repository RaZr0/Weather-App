import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherDetailsComponent } from './weather-details.component';
import { WeatherDetailsRoutingModule } from './weather-details-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WeatherLocationSearchComponent } from './components/weather-location-search/weather-location-search.component';
import { LocationWeatherDetailsComponent } from './components/location-weather-details/location-weather-details.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { DailyForecastComponent } from './components/daily-forecast/daily-forecast.component';



@NgModule({
  declarations: [WeatherDetailsComponent, WeatherLocationSearchComponent, LocationWeatherDetailsComponent, DailyForecastComponent],
  imports: [
    CommonModule,
    WeatherDetailsRoutingModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class WeatherDetailsModule { }
