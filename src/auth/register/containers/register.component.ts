import { Component } from '@angular/core';

@Component({
  selector: 'auth-register',
  template: `
  <auth-form>
    <h1>Register</h1>
    <button mat-raised-button color="primary">Create Account</button>
    <a routerLink="/auth/login">Already have an account?</a>
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
export class RegisterComponent {

}
