import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar  color="primary">
      <a class="app-title" routerLink="/">Todo list</a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'app';
}
