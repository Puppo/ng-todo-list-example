import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule
} from '@angular/material';

import { environment } from '../environments/environment';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects, CustomSerializer } from './store';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { AuthModule } from '../auth';
import { TodoModule } from '../todo';
import { ApiUrl } from '../constants';

import * as fromContainers from './containers';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

const ROUTES: Routes = [{ path: '', pathMatch: 'full', redirectTo: 'auth' }];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AuthModule,
    TodoModule
  ],
  declarations: [...fromContainers.AppContainers],
  providers: [
    { provide: ApiUrl, useValue: 'http://localhost:3000' },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [fromContainers.AppComponent]
})
export class AppModule {}
