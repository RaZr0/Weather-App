import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

export class CacheControl {
  constructor(public key: string, public maxAge?: Date) {
  }
}

class CacheData<T>
{
  constructor(public data: T, public cacheTime?: number) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly appCacheKey: string = 'HeroloWeatherApp';

  constructor() {
    if (!this.appCacheData)
      window.localStorage.setItem(this.appCacheKey, JSON.stringify({}));
  }

  get<T>(cacheKey: string): T {
    const cacheData: CacheData<T> = this.appCacheData[cacheKey];
    if (cacheData) {
      if (cacheData.cacheTime && new Date() > new Date(cacheData.cacheTime)) {
        return null;
      }
      return cacheData.data;
    }
    return null;
  }

  set<T>(data: T, cacheControl: CacheControl) {
    this.setAppCacheData(data, cacheControl);
  }

  private get appCacheData() {
    return JSON.parse(window.localStorage.getItem(this.appCacheKey));
  }

  private setAppCacheData<T>(data: T, cacheControl: CacheControl) {
    const appCacheData = this.appCacheData;
    appCacheData[cacheControl.key] = new CacheData(data, !isNullOrUndefined(cacheControl.maxAge) ? cacheControl.maxAge.getTime() : null);
    window.localStorage.setItem(this.appCacheKey, JSON.stringify(appCacheData));
  }
}
