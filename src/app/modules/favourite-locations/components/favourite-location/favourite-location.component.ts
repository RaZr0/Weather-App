import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FavouriteLocation } from '../../models/favourite-location';
import { WeatherLocation } from '../../../../shared/models/weather-location.model';

@Component({
  selector: 'app-favourite-location',
  templateUrl: './favourite-location.component.html',
  styleUrls: ['./favourite-location.component.scss']
})
export class FavouriteLocationComponent implements OnInit {
  @Input() favouriteLocation: FavouriteLocation;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getMoreDetails(favouriteLocation: FavouriteLocation) {
    const weatherLocation: WeatherLocation = new WeatherLocation(favouriteLocation.id, favouriteLocation.name);
    this.router.navigate(['/'], { queryParamsHandling: 'merge', queryParams: { weatherLocation: JSON.stringify(weatherLocation) } });
  }
}
