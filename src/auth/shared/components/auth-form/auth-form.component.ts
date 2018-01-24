import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'auth-form',
  template: `
  <mat-card class="auth-form">
    <mat-card-title>
      <ng-content select="h1"></ng-content>
    </mat-card-title>

    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field class="auth-field">
        <input matInput
        placeholder="Email"
        formControlName="email"
        autocomplete="off">
        <mat-error *ngIf="emailRequired">Email is required</mat-error>
        <mat-error *ngIf="emailFormat">Invalid email format</mat-error>
      </mat-form-field>

      <mat-form-field class="auth-field">
        <input type="password"
        matInput
        placeholder="Password"
        formControlName="password"
        autocomplete="off">
        <mat-error *ngIf="passwordInvalid">Password is required</mat-error>
      </mat-form-field>

      <ng-content select=".error"></ng-content>

      <div class="auth-form__action">
        <ng-content select="button"></ng-content>
      </div>

      <div class="auth-form__toggle">
        <ng-content select="a"></ng-content>
      </div>
    </form>

  </mat-card>
  `,
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  @Output()
  submitted = new EventEmitter<FormGroup>();

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }

  get passwordInvalid() {
    const control = this.form.get('password');
    return control.hasError('required') && control.touched;
  }

  get emailRequired() {
    const control = this.form.get('email');
    return control.hasError('required') && control.touched;
  }

  get emailFormat() {
    const control = this.form.get('email');
    return !this.emailRequired && control.hasError('email') && control.touched;
  }
}
