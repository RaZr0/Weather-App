import { Injectable } from '@angular/core';
import { HttpService, IResponse } from './http-service.service';
import { Observable } from 'rxjs';
import { IWeatherLocation } from '../interfaces/weather-location.interface';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { CacheControl } from './cache.service';
import { GeoPosition } from '../models/geo-position.model';
import { CacheHelper, CacheTime } from '../helpers/cache-helper';

@Injectable({
  providedIn: 'root'
})
export class AccuWeatherService {
  constructor(
    private httpService: HttpService
  ) { }

  public get<T>(url: string, params?: HttpParams, cacheControl?: CacheControl): Observable<IResponse<T>> {
    return this.httpService.get<T>(`${environment.accuWeatherApiUrl}/${url}?apikey=${environment.accuWeatherApiKey}`, params, cacheControl);
  }

  public getCities(city: string): Observable<IResponse<IWeatherLocation[]>> {
    const params = new HttpParams()
      .set('q', city);
    return this.get<IWeatherLocation[]>(`locations/v1/cities/autocomplete`, params, new CacheControl(`citiesSearch${city}`,CacheHelper.getCacheTime(CacheTime.Forever)));
  }

  public getGeopositionLocation(geoPosition: GeoPosition): Observable<IResponse<IWeatherLocation>> {
    const params = new HttpParams()
      .set('q', `${geoPosition.latitude},${geoPosition.longitude}`);
    return this.get<IWeatherLocation>(`locations/v1/cities/geoposition/search`, params, new CacheControl(`geopositionLocation[lat:${geoPosition.latitude},long:${geoPosition.longitude} ]`, CacheHelper.getCacheTime(CacheTime.Forever)));
  }
}
