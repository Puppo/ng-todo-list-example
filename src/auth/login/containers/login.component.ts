import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromStore from '../../store';

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
  public error$ = this.store.select(fromStore.getLoginErrorSelector);
  public errorMessage$ = this.error$.pipe(map(x => !!x ? x.message : null));
  public hasError$ = this.error$.pipe(map(x => !!x));
  constructor(protected store: Store<fromStore.IAuthState>) {}

  submit(form: FormGroup) {
    const email = form.get('email').value as string;
    const password = form.get('password').value as string;

    const action = new fromStore.LoginAction(email, password);
    this.store.dispatch(action);
  }
}
