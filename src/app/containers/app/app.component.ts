import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { map } from 'rxjs/operators';

import * as fromAuthStore from '../../../auth/store';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <a class="app-title" routerLink="/">Todo list</a>
        <span class="spacer"></span>
        <button mat-icon-button [matMenuTriggerFor]="menu" *ngIf="hasUser$ | async">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </mat-toolbar-row>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  hasUser$ = this.store.select(fromAuthStore.getLoginEmailSelector)
  .pipe(
    map(x => !!x)
  );
  constructor(protected store: Store<fromAuthStore.IAuthState>) {}
  logout(): void {
    this.store.dispatch(new fromAuthStore.LogoutAction());
  }
}
