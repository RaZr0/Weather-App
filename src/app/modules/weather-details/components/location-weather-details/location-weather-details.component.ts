import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherLocationService } from '../../services/weather-location.service';
import { Subscription } from 'rxjs';
import { IWeatherCondition } from '../../interfaces/weather-condition.interface';
import { WeatherLocation } from '../../../../shared/models/weather-location.model';
import { FavouriteLocationsService } from 'src/app/shared/services/favourite-locations.service';
import { DailyForecast } from '../../models/daily-forecast.model';
import { Temperature, TemperatureUnit } from '../../../../shared/models/temperature.model';
import { MatDialog } from '@angular/material/dialog';
import { AccuWeatherService } from '../../../../shared/services/accu-weather.service';
import { GeoPosition } from 'src/app/shared/models/geo-position.model';
import { TechnicalErrorDialogComponent } from '../../../../shared/components/dialogs/technical-error-dialog/technical-error-dialog.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { StateManagementService } from '../../../../shared/services/state-management.service';

@Component({
  selector: 'app-location-weather-details',
  templateUrl: './location-weather-details.component.html',
  styleUrls: ['./location-weather-details.component.scss']
})
export class LocationWeatherDetailsComponent implements OnInit, OnDestroy {
  sub: Subscription;
  weatherConditionData: IWeatherCondition;
  dailyForecasts: DailyForecast[];
  weatherLocation: WeatherLocation;
  isInfavourites: boolean;
  currentTemperatureUnitType: TemperatureUnit;

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherLocationService: WeatherLocationService,
    private favouriteLocationsService: FavouriteLocationsService,

    private accuWeatherService: AccuWeatherService,
    private stateManagementService: StateManagementService,

    private router: Router,
    private dialog: MatDialog
  ) {
    this.currentTemperatureUnitType = 'C';
  }

  ngOnInit() {
    this.sub = this.stateManagementService.getState<WeatherLocation>('weatherLocation').subscribe((weatherLocation)=>{
      if (weatherLocation) {
        this.weatherLocation = weatherLocation;
        this.setCurrentConditions(this.weatherLocation);
        this.setNext5DaysForcast(this.weatherLocation, this.currentTemperatureUnitType);
        this.isInfavourites = this.favouriteLocationsService.isInFavourites(this.weatherLocation);
      }
      else
        this.initDefaultLocation();
    });
  }

  private setCurrentConditions(weatherLocation: WeatherLocation) {
    this.weatherLocationService.getCurrentConditions(weatherLocation).subscribe((res) => {
      if (res.statusCode === 200)
        this.weatherConditionData = res.result[0];
      else
        this.dialog.open(TechnicalErrorDialogComponent);
    });
  }

  private setNext5DaysForcast(weatherLocation: WeatherLocation, temperatureUnitType: TemperatureUnit) {
    this.weatherLocationService.getNext5DaysForcast(weatherLocation, temperatureUnitType).subscribe((res) => {
      if (res.statusCode === 200)
        this.dailyForecasts = res.result.DailyForecasts.map<DailyForecast>(dailyForecast => {
          return new DailyForecast(
            dailyForecast.Date,
            new Temperature((dailyForecast.Temperature.Maximum.Value + dailyForecast.Temperature.Minimum.Value) / 2, <TemperatureUnit>dailyForecast.Temperature.Maximum.Unit))
        });
      else
        this.dialog.open(TechnicalErrorDialogComponent);

    });
  }

  handleFavourite() {
    if (this.isInfavourites)
      this.favouriteLocationsService.remove(this.weatherLocation);
    else
      this.favouriteLocationsService.add(this.weatherLocation);
    this.isInfavourites = !this.isInfavourites;
  }

  initDefaultLocation() {
    if (window.navigator) {
      navigator.geolocation.getCurrentPosition((data) => {
        const geolocation = new GeoPosition(data.coords.latitude, data.coords.longitude);
        this.accuWeatherService.getGeopositionLocation(geolocation).subscribe((res) => {
          this.updatePageState(new WeatherLocation(res.result.Key, res.result.LocalizedName));
        });
      }, () => {
        this.setDefaultLocation('Tel aviv');
      })
    }
    else
      this.setDefaultLocation('Tel aviv');
  }

  private setDefaultLocation(city: string) {
    this.accuWeatherService.getCities(city).subscribe((res) => {
      if (res.statusCode === 200 && res.result.length > 0)
        this.updatePageState(new WeatherLocation(res.result[0].Key, res.result[0].LocalizedName));
    });
  }

  private updatePageState(weatherLocation: WeatherLocation) {
    this.stateManagementService.updateState('weatherLocation', weatherLocation).subscribe(()=>{});
  }


  toogleUnitType(matSlideToggleChange: MatSlideToggleChange) {
    if (matSlideToggleChange.checked)
      this.currentTemperatureUnitType = 'F';
    else
      this.currentTemperatureUnitType = 'C';
    this.setNext5DaysForcast(this.weatherLocation, this.currentTemperatureUnitType);
  }
  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }
}
