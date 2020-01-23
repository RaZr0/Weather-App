import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeatherCondition } from '../interfaces/weather-condition.interface';
import { IDailyWeather } from '../interfaces/daily-weather.interface';
import { HttpService, IResponse } from '../../../shared/services/http-service.service';
import { AccuWeatherService } from '../../../shared/services/accu-weather.service';
import { IWeatherLocation } from 'src/app/shared/interfaces/weather-location.interface';
import { WeatherLocation } from '../../../shared/models/weather-location.model';
import { HttpParams } from '@angular/common/http';
import { CacheControl } from 'src/app/shared/services/cache.service';
import { CacheHelper, CacheTime } from 'src/app/shared/helpers/cache-helper';

@Injectable({
  providedIn: 'root'
})
export class WeatherLocationService extends AccuWeatherService {
  constructor(private httpSvc: HttpService) {
    super(httpSvc);
  }

  public getCurrentConditions(weatherLocation: WeatherLocation): Observable<IResponse<IWeatherCondition[]>> {
    return super.get<IWeatherCondition[]>(`currentconditions/v1/${weatherLocation.id}`, null, new CacheControl(`currentConditions${weatherLocation.name}`));
  }

  public getNext5DaysForcast(weatherLocation: WeatherLocation, metric: boolean = true): Observable<IResponse<IDailyWeather>> {
    const params = new HttpParams()
      .set('metric', String(metric));

    return super.get<IDailyWeather>(`forecasts/v1/daily/5day/${weatherLocation.id}`, params, new CacheControl(`next5DaysForcast${weatherLocation.name}`, CacheHelper.getCacheTimeInSeconds(CacheTime.NextDay)));
  }

  public getCities(city: string): Observable<IResponse<IWeatherLocation[]>> {
    return super.getCities(city, new CacheControl(`citiesSearch${city}`));
  }
}
