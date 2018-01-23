import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import * as fromComponents from './components';
import * as fromServices from './services';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule
  ],
  declarations: [
    ...fromComponents.AuthComponents
  ],
  exports: [
    ...fromComponents.AuthComponents
  ]
})
export class AuthSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthSharedModule,
      providers: [
        ...fromServices.AuthSharedServices
      ]
    };
  }
}
