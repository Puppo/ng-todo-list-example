import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as fromStore from '../../../store';

@Component({
  selector: 'auth-login',
  template: `
  <auth-form (submitted)="submit($event)">
    <h1>Login</h1>
    <button mat-raised-button color="primary">Login</button>
    <a routerLink="/auth/register">Not registered?</a>
    <div class="error" *ngIf="hasError$ | async">
      {{ errorMessage$ | async }}
    </div>
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
export class LoginComponent {
  public hasLoading$ = this.store.select(fromStore.getLoginLoadingSelector);
  public errorMessage$ = this.store.select(fromStore.getLoginErrorMessageSelector);
  public hasError$ = this.store.select(fromStore.getLoginHasErrorSelector);
  constructor(protected store: Store<fromStore.IAuthState>) {}

  submit(form: FormGroup) {
    const email = form.get('email').value as string;
    const password = form.get('password').value as string;

    const action = fromStore.loginAction({email, password});
    this.store.dispatch(action);
  }
}
