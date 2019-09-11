import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthSharedModule } from './shared';
import { AUTH_REDUCER_TOKEN, effects, AuthServicesReducers } from './store';
import { NotAuthenticatedGuard, AuthGuards } from './guards';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        canActivate: [NotAuthenticatedGuard]
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
        canActivate: [NotAuthenticatedGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AuthSharedModule.forRoot(),
    StoreModule.forFeature('auth', AUTH_REDUCER_TOKEN),
    EffectsModule.forFeature(effects)
  ],
  providers: [AuthServicesReducers, AuthGuards]
})
export class AuthModule {}
