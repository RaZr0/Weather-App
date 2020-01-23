import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherDetailsComponent } from './weather-details.component';


const routes: Routes = [
  {
    path:'',
    component:WeatherDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class WeatherDetailsRoutingModule { }
