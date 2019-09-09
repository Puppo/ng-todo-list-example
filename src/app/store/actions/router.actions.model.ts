import { NavigationExtras } from '@angular/router';

export interface IRouteState {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}

export interface IGoProps extends IRouteState { }
