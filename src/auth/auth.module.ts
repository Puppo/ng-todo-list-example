import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthSharedModule } from './shared';
import { reducers, effects } from './store';
import * as fromGuards from './guards';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: 'register', loadChildren: './register/register.module#RegisterModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AuthSharedModule.forRoot(),
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [
    ...fromGuards.AuthGuards
  ]
})
export class AuthModule {}
