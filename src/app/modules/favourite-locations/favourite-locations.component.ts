import { Component, OnInit } from '@angular/core';
import { FavouriteLocationsService } from '../../shared/services/favourite-locations.service';
import { WeatherLocation } from 'src/app/shared/models/weather-location.model';
import { WeatherLocationService } from '../weather-details/services/weather-location.service';
import { FavouriteLocation } from './models/favourite-location';
import { MatDialog } from '@angular/material/dialog';
import { GeneralDialogComponent } from 'src/app/shared/components/dialogs/general-dialog/general-dialog.component';
import { TechnicalErrorDialogComponent } from 'src/app/shared/components/dialogs/technical-error-dialog/technical-error-dialog.component';
import { TemperatureUnit } from 'src/app/shared/models/temperature.model';


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
    private dialog: MatDialog

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
                temperature: {unit: <TemperatureUnit>res.result[0].Temperature.Metric.Unit, value: res.result[0].Temperature.Metric.Value },
                pharse: res.result[0].WeatherText
              }
            );
          else
            this.dialog.open(TechnicalErrorDialogComponent);
        });
      })
    }
    else {
      this.dialog.open(GeneralDialogComponent, {
        data: { header: 'Favourites', content: 'You have no favourites yet.' }
      });
    }
  }
}
