import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  activeTheme: Theme;
  themeChanged : Subject<Theme> = new Subject();

  constructor() { }

  
  changeTheme(theme: Theme) {
    this.activeTheme = theme;
    this.themeChanged.next(this.activeTheme);
  }
}
