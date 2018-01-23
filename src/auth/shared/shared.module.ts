import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import * as fromComponents from './components';

@NgModule({
  imports: [
    CommonModule,
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
export class AuthSharedModule { }
