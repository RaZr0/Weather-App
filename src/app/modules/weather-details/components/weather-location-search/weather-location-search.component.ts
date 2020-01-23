import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherLocation } from '../../../../shared/models/weather-location.model';
import { IWeatherLocation } from '../../../../shared/interfaces/weather-location.interface';
import { WeatherLocationService } from '../../services/weather-location.service';

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
    private weatherLocationService: WeatherLocationService
  ) { }

  ngOnInit() {
    this.weatherLocationControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe((value) => {
      if (this.weatherLocationControl.valid)
        this.filterCities(value);
    });
    this.getPageState().subscribe((res) => {
      if (!res)
        this.initDefaultLocation('Tel Aviv');
    })
  }

  private filterCities(value: string | IWeatherLocation) {
    if (typeof value === 'string' && value !== '' && (this.selectedWeatherLocation == null || value !== this.selectedWeatherLocation.LocalizedName))
      this.getCities(value).subscribe((res) => {
        this.filteredWeatherLocations = res;
      });
  }


  private getCities(value: string): Observable<IWeatherLocation[]> {
    return new Observable((obs) => {
      this.weatherLocationService.getCities(value).subscribe((res) => {
        if (res.statusCode === 200) {
          if (res.result.length > 0)
            obs.next(res.result);
          else
            console.warn("no cities found.");
        }
        else
          alert('something went wrong..')
      })
    })
  }

  optionSelected(value: MatAutocompleteSelectedEvent) {
    this.selectedWeatherLocation = value.option.value;
    this.weatherLocationControl.setValue(value.option.value.LocalizedName);
    this.updatePageState(new WeatherLocation(this.selectedWeatherLocation.Key, this.selectedWeatherLocation.LocalizedName));
  }


  initDefaultLocation(cityName: string) {
    this.getCities(cityName).subscribe((res) => {
      if (res && res.length > 0)
        this.updatePageState(new WeatherLocation(res[0].Key, res[0].LocalizedName));
    });
  }

  private updatePageState(weatherLocation: WeatherLocation) {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { weatherLocation: JSON.stringify(weatherLocation) },
        queryParamsHandling: 'merge',
      });
  }

  private getPageState(): Observable<WeatherLocation> {
    return new Observable((obs) => {
      const queryParams = this.activatedRoute.snapshot.queryParams;
      const weatherLocation = queryParams.weatherLocation ? JSON.parse(queryParams.weatherLocation) : null;
      obs.next(weatherLocation);
    })
  }
}
