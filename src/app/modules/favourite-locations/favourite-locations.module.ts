import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteLocationsComponent } from './favourite-locations.component';
import { FavouriteLocationsRoutingModule } from './favourite-locations-routing.module';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { FavouriteLocationComponent } from './components/favourite-location/favourite-location.component';



@NgModule({
  declarations: [FavouriteLocationsComponent, FavouriteLocationComponent],
  imports: [
    CommonModule,
    FavouriteLocationsRoutingModule,
    SharedModule
  ]
})
export class FavouriteLocationsModule { }
