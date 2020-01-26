import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherLocation } from '../../../../shared/models/weather-location.model';
import { IWeatherLocation } from '../../../../shared/interfaces/weather-location.interface';
import { AccuWeatherService } from 'src/app/shared/services/accu-weather.service';
import { MatDialog } from '@angular/material/dialog';
import { TechnicalErrorDialogComponent } from '../../../../shared/components/dialogs/technical-error-dialog/technical-error-dialog.component';
import { StateManagementService } from '../../../../shared/services/state-management.service';

@Component({
  selector: 'app-weather-location-search',
  templateUrl: './weather-location-search.component.html',
  styleUrls: ['./weather-location-search.component.scss']
})
export class WeatherLocationSearchComponent implements OnInit {
  weatherLocationControl = new FormControl('', [Validators.pattern('^[a-z A-Z]+$')]);
  selectedWeatherLocation: IWeatherLocation;
  weatherLocations: IWeatherLocation[];
  filteredWeatherLocations: IWeatherLocation[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accuWeatherService: AccuWeatherService,
    private dialog: MatDialog,
    private stateManagementService : StateManagementService
  ) { }

  ngOnInit() {
    this.weatherLocationControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe((value) => {
      if (this.weatherLocationControl.valid)
        this.filterCities(value);
    });
  }

  private filterCities(value: string | IWeatherLocation) {
    if (typeof value === 'string' && value !== '' && (this.selectedWeatherLocation == null || value !== this.selectedWeatherLocation.LocalizedName))
      this.getCities(value).subscribe((res) => {
        this.filteredWeatherLocations = res;
      });
  }


  private getCities(value: string): Observable<IWeatherLocation[]> {
    return new Observable((obs) => {
      this.accuWeatherService.getCities(value).subscribe((res) => {
        if (res.statusCode === 200) {
          if (res.result.length > 0)
            obs.next(res.result);
          else
            console.warn("no cities found.");
        }
        else
          this.dialog.open(TechnicalErrorDialogComponent);
      })
    })
  }

  optionSelected(value: MatAutocompleteSelectedEvent) {
    this.selectedWeatherLocation = value.option.value;
    this.weatherLocationControl.setValue(value.option.value.LocalizedName);
    this.stateManagementService.updateState('weatherLocation' , new WeatherLocation(this.selectedWeatherLocation.Key, this.selectedWeatherLocation.LocalizedName)).subscribe(()=>{
      
    });
  }
}
