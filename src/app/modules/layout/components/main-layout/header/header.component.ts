import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LayoutService } from '../../../services/layout.service';


interface ITab {
  title: string;
  link: string;
}

@Component({
  selector: 'app-main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  activeTab: number;


  tabs: ITab[] = [
    {
      title: 'Home',
      link: '/'
    },
    {
      title: 'Favourites',
      link: '/favourite-locations'
    }
  ]
  constructor(public layoutService:LayoutService) { }

  ngOnInit() {
    this.setActiveTab(0);
    this.layoutService.changeTheme('light');
  }

  setActiveTab(tab: number) {
    this.activeTab = tab;
  }


  toogleTheme(matSlideToggleChange: MatSlideToggleChange) {
    if (matSlideToggleChange.checked)
      this.layoutService.changeTheme('dark');
    else
      this.layoutService.changeTheme('light');
  }

}
