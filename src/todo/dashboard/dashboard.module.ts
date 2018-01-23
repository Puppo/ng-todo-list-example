import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TodoSharedModule } from '../shared';

import * as fromComponents from './components';

const ROUTES: Routes = [
  { path: '', component: fromComponents.DashboardComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TodoSharedModule
  ],
  declarations: [
    ...fromComponents.DashboardComponents
  ],
  exports: [
    ...fromComponents.DashboardComponents
  ]
})
export class DashboardModule {}
