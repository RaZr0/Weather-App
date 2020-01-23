import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherLocationService } from '../../services/weather-location.service';
import { Subscription } from 'rxjs';
import { IWeatherCondition } from '../../interfaces/weather-condition.interface';
import { IDailyWeather } from '../../interfaces/daily-weather.interface';
import { WeatherLocation } from '../../../../shared/models/weather-location.model';
import { FavouriteLocationsService } from 'src/app/shared/services/favourite-locations.service';
import { DailyForecast } from '../../models/daily-forecast';
import { Temperature } from 'src/app/shared/models/temperature';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherLocationService: WeatherLocationService,
    private favouriteLocationsService: FavouriteLocationsService
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe(queryParams => {
      const weatherLocation = queryParams.weatherLocation ? JSON.parse(queryParams.weatherLocation) : null;
      if (weatherLocation) {
        this.weatherLocation = weatherLocation;
        this.weatherLocationService.getCurrentConditions(this.weatherLocation).subscribe((res) => {
          if (res.statusCode === 200)
            this.weatherConditionData = res.result[0];
          else
            alert('something went wrong..')

        });

        this.weatherLocationService.getNext5DaysForcast(this.weatherLocation).subscribe((res) => {
          if (res.statusCode === 200)
            this.dailyForecasts = res.result.DailyForecasts.map<DailyForecast>(dailyForecast => {
              return new DailyForecast(
                dailyForecast.Date,
                new Temperature((dailyForecast.Temperature.Maximum.Value + dailyForecast.Temperature.Minimum.Value) / 2, dailyForecast.Temperature.Maximum.Unit))
            });
          else
            alert('something went wrong..')

        });

        this.isInfavourites = this.favouriteLocationsService.isInFavourites(this.weatherLocation);
      }
    });
  }

  addTofavourites() {
    this.favouriteLocationsService.add(this.weatherLocation);
    this.isInfavourites = true;
  }

  removeFromfavourites() {
    this.favouriteLocationsService.remove(this.weatherLocation);
    this.isInfavourites = false;
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }
}
