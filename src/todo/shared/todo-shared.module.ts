import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatListModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';

import * as fromComponents from './components';
import * as fromServices from './services';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [...fromComponents.TodoComponents],
  exports: [...fromComponents.TodoComponents]
})
export class TodoSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TodoSharedModule,
      providers: [...fromServices.TodoSharedServices]
    };
  }
}
