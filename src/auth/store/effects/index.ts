import { LoginEffect } from './login.effect';
import { RegisterEffect } from './register.effect';

export * from './login.effect';
export * from './register.effect';

export const effects: any[] = [
  LoginEffect,
  RegisterEffect
];
