import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeatherCondition } from '../interfaces/weather-condition.interface';
import { IDailyWeather } from '../interfaces/daily-weather.interface';
import { HttpService, IResponse } from '../../../shared/services/http-service.service';
import { AccuWeatherService } from '../../../shared/services/accu-weather.service';
import { WeatherLocation } from '../../../shared/models/weather-location.model';
import { HttpParams } from '@angular/common/http';
import { CacheControl } from 'src/app/shared/services/cache.service';
import { CacheHelper, CacheTime } from 'src/app/shared/helpers/cache-helper';
import { TemperatureUnit } from '../../../shared/models/temperature.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherLocationService {
  constructor(private httpSvc: HttpService, private accuWeatherService: AccuWeatherService) {
  }

  public getCurrentConditions(weatherLocation: WeatherLocation): Observable<IResponse<IWeatherCondition[]>> {
    return this.accuWeatherService.get<IWeatherCondition[]>(`currentconditions/v1/${weatherLocation.id}`, null, new CacheControl(`currentConditions${weatherLocation.name}`, CacheHelper.getCacheTime(CacheTime.NextDay)));
  }

  public getNext5DaysForcast(weatherLocation: WeatherLocation, temperatureUnit: TemperatureUnit = 'C'): Observable<IResponse<IDailyWeather>> {
    const params = new HttpParams()
      .set('metric', temperatureUnit === 'C' ? 'true' : 'false');

    return this.accuWeatherService.get<IDailyWeather>(`forecasts/v1/daily/5day/${weatherLocation.id}`, params, new CacheControl(`next5DaysForcast${weatherLocation.name}['temperatureUnit :' ${temperatureUnit}]`, CacheHelper.getCacheTime(CacheTime.NextDay)));
  }
}
