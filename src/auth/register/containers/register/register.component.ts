import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromStore from '../../../store';

@Component({
  selector: 'auth-register',
  template: `
  <auth-form (submitted)="submit($event)">
    <h1>Register</h1>
    <button mat-raised-button color="primary">Create Account</button>
    <a routerLink="/auth/login">Already have an account?</a>
  </auth-form>
    `,
  styles: [
    `
  button {
    width: 100%;
  }
  a {
    color: white;
  }
  .error {
    color: #f44336;
  }`
  ]
})
export class RegisterComponent {
  public hasLoading$ = this.store.select(fromStore.getRegisterLoadingSelector);
  public errorMessage$ = this.store.select(fromStore.getRegisterErrorMessageSelector);
  public hasError$ = this.store.select(fromStore.getRegisterHasErrorSelector);

  constructor(protected store: Store<fromStore.IAuthState>) {}

  submit(form: FormGroup) {
    const email = form.get('email').value as string;
    const password = form.get('password').value as string;

    const action = new fromStore.RegisterAction(email, password);
    this.store.dispatch(action);
  }
}
