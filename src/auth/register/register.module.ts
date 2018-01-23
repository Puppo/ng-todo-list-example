import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material';

import { AuthSharedModule } from '../shared';

import * as fromContainers from './containers';

const ROUTES: Routes = [
  { path: '', component: fromContainers.RegisterComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    AuthSharedModule
  ],
  declarations: [
    ...fromContainers.RegisterContainers
  ],
  exports: [
    ...fromContainers.RegisterContainers
  ]
})
export class RegisterModule {}
