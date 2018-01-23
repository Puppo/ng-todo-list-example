import { Component } from '@angular/core';

@Component({
  selector: 'auth-login',
  template: `
  <auth-form>
    <h1>Login</h1>
    <button mat-raised-button color="primary">Login</button>
    <a routerLink="/auth/register">Not registered?</a>
  </auth-form>
  `,
  styles: [`
  button {
    width: 100%;
  }

  a {
    color: white;
  }`]
})
export class LoginComponent {

}
