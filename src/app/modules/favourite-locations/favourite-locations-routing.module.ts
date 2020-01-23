import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavouriteLocationsComponent } from './favourite-locations.component';


const routes: Routes = [
  {
    path:'',
    component:FavouriteLocationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class FavouriteLocationsRoutingModule { }
