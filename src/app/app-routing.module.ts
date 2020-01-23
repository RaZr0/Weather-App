import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './modules/layout/components/main-layout/main-layout.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children:
      [
        {
          path: '',
          loadChildren: () => import('./modules/weather-details/weather-details.module').then(m => m.WeatherDetailsModule)
        },
        {
          path: 'favourite-locations',
          loadChildren: () => import('./modules/favourite-locations/favourite-locations.module').then(m => m.FavouriteLocationsModule)
        }
      ]
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
