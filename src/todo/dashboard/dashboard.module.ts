import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import * as fromAuth from '../../auth';
import { TodoSharedModule } from '../shared';

import * as fromContainers from './containers';

const ROUTES: Routes = [
  { path: '', component: fromContainers.DashboardComponent, canActivate: [fromAuth.AuthenticatedGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TodoSharedModule
  ],
  declarations: [
    ...fromContainers.DashboardContainers
  ],
  exports: [
    ...fromContainers.DashboardContainers
  ]
})
export class DashboardModule {}
