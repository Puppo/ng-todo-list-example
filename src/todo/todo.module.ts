import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

import { DashboardModule } from './dashboard';
import { TodoSharedModule } from './shared';

const ROUTES: Routes = [
  {
    path: 'todo',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TodoSharedModule.forRoot(),
    DashboardModule,
    StoreModule.forFeature('todo', reducers),
    EffectsModule.forFeature(effects),
  ]
})
export class TodoModule {}
