import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HeaderComponent } from './components/main-layout/header/header.component';
import { FooterComponent } from './components/main-layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';



@NgModule({
  declarations: [MainLayoutComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MDBBootstrapModule.forRoot()
  ],
  exports: [
    MainLayoutComponent, HeaderComponent, FooterComponent
  ]
})
export class LayoutModule { }
