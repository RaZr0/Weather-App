import { Component, OnInit } from '@angular/core';
import { FavouriteLocationsService } from '../../shared/services/favourite-locations.service';
import { WeatherLocation } from 'src/app/shared/models/weather-location.model';
import { WeatherLocationService } from '../weather-details/services/weather-location.service';
import { IWeatherCondition } from '../weather-details/interfaces/weather-condition.interface';
import { Router } from '@angular/router';
import { FavouriteLocation } from './models/favourite-location';
import { FavouriteLocationComponent } from './components/favourite-location/favourite-location.component';


@Component({
  selector: 'favourite-locations',
  templateUrl: './favourite-locations.component.html',
  styleUrls: ['./favourite-locations.component.scss']
})
export class FavouriteLocationsComponent implements OnInit {
  favouriteLocations: WeatherLocation[];
  favouriteLocationsConditions: FavouriteLocation[] = [];

  constructor(
    private favouriteLocationsService: FavouriteLocationsService,
    private weatherLocationService: WeatherLocationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.favouriteLocations = this.favouriteLocationsService.getAll();
    if (this.favouriteLocations && this.favouriteLocations.length > 0) {
      this.favouriteLocations.forEach((favouriteLocation) => {
        this.weatherLocationService.getCurrentConditions(favouriteLocation).subscribe((res) => {
          if (res.statusCode === 200)
            this.favouriteLocationsConditions.push(
              {
                id: favouriteLocation.id,
                name: favouriteLocation.name,
                temperature : {unit : res.result[0].Temperature.Metric.Unit , value :  res.result[0].Temperature.Metric.Value},
                pharse : res.result[0].WeatherText
              }
            );
          else
            alert('something went wrong..')
        });
      })
    }
    else
      alert('you have no favourites yet..')
  }


}
