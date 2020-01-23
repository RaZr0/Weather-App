import { HttpService, IResponse } from './http-service.service';
import { Observable } from 'rxjs';
import { IWeatherLocation } from '../interfaces/weather-location.interface';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { CacheControl } from './cache.service';

export abstract class AccuWeatherService {
  constructor(
    protected httpService: HttpService
  ) { }

  protected get<T>(url: string, params?: HttpParams, cacheControl?: CacheControl): Observable<IResponse<T>> {
    return this.httpService.get<T>(`${environment.accuWeatherApiUrl}/${url}?apikey=${environment.accuWeatherApiKey}`, params, cacheControl);
  }

  protected getCities(city: string, cacheControl?: CacheControl): Observable<IResponse<IWeatherLocation[]>> {
    const params = new HttpParams()
      .set('q', city)
    return this.get<IWeatherLocation[]>(`locations/v1/cities/autocomplete`, params, cacheControl);
  }
}
