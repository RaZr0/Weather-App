import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FavouriteLocation } from '../../models/favourite-location';
import { WeatherLocation } from '../../../../shared/models/weather-location.model';
import { StateManagementService } from '../../../../shared/services/state-management.service';

@Component({
  selector: 'app-favourite-location',
  templateUrl: './favourite-location.component.html',
  styleUrls: ['./favourite-location.component.scss']
})
export class FavouriteLocationComponent implements OnInit {
  @Input() favouriteLocation: FavouriteLocation;

  constructor(
    private router: Router,
    private stateManagementService: StateManagementService

  ) { }

  ngOnInit() {
  }

  getMoreDetails(favouriteLocation: FavouriteLocation) {
    this.stateManagementService.updateState('weatherLocation', new WeatherLocation(favouriteLocation.id, favouriteLocation.name)).subscribe(() => {
      this.router.navigate(['/'], { queryParamsHandling: 'preserve' });
    });
  }
}
