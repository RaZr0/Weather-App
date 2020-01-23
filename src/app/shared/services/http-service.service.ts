import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { CacheService, CacheControl } from './cache.service';

export interface IResponse<T> {
  statusCode: number;
  result: T;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient,
    private cacheService: CacheService
  ) { }

  public get<T>(url: string, params?: HttpParams, cacheControl?: CacheControl): Observable<IResponse<T>> {
    if (cacheControl) {
      return this.getWithCache<T>(url, params, cacheControl);
    }
    return new Observable<IResponse<T>>((obs) => {
      this.getFullResponse(url, params).subscribe((res: HttpResponse<T>) => {
        obs.next({ result: res.body, statusCode: res.status })
      });
    })
  }

  private getWithCache<T>(url: string, params?: HttpParams, cacheControl?: CacheControl): Observable<IResponse<T>> {
    const cachedRequest: T = this.cacheService.get<T>(cacheControl.key);
    if (cachedRequest)
      return new Observable<IResponse<T>>((obs) => {
        obs.next({ result: cachedRequest, statusCode: 200 });
      });
    return new Observable<IResponse<T>>((obs) => {
      this.getFullResponse(url, params).subscribe((res: HttpResponse<T>) => {
        const response: IResponse<T> = { result: res.body, statusCode: res.status };
        if (res.status === 200)
          this.cacheService.set(res.body, cacheControl);
        obs.next(response);
      });
    })
  }

  private getFullResponse<T>(url: string, params?: HttpParams): Observable<HttpResponse<T>> {
    return this.httpClient.get<T>(url, { params: params, observe: 'response' });
  }
}
