import { Injectable } from '@angular/core';
import { WeatherLocation } from '../models/weather-location.model';
import { CacheService, CacheControl } from './cache.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class FavouriteLocationsService {

  constructor(
    private cacheService: CacheService
  ) {
    if (!this.favourites)
      this.favourites = [];
  }

  public add(weatherLocation: WeatherLocation) {
    this.addFavorite(weatherLocation);
  }

  public remove(weatherLocation: WeatherLocation) {
    this.removeFavorite(weatherLocation);
  }

  public get(weatherLocation: WeatherLocation) {
    return this.favourites && this.favourites.find((favorite) => { return favorite.id === weatherLocation.id });
  }

  public isInFavourites(weatherLocation: WeatherLocation) {
    return this.isFavouriteExists(weatherLocation);
  }

  public getAll() {
    return this.favourites;
  }

  private get favourites(): WeatherLocation[] {
    return this.cacheService.get('favourites') || [];
  }

  private set favourites(favourites: WeatherLocation[]) {
    this.cacheService.set(favourites, new CacheControl('favourites'));
  }

  private removeFavorite(weatherLocation: WeatherLocation) {
    const favourites = this.favourites;
    const favouritesAfterRemove = favourites && favourites.filter((favourite) => { return favourite.id !== weatherLocation.id });
    this.favourites = favouritesAfterRemove;
  }

  private addFavorite(weatherLocation: WeatherLocation) {
    const favourites = this.favourites;
    if (!this.isFavouriteExists(weatherLocation)) {
      favourites.push(weatherLocation);
      this.cacheService.set(favourites, new CacheControl('favourites'));
    }
  }

  private isFavouriteExists(weatherLocation: WeatherLocation) {
    const favorite = this.favourites && this.favourites.find((favorite) => { return favorite.id === weatherLocation.id });
    return !isNullOrUndefined(favorite);
  }
}
