import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  constructor(
    protected http: HttpClient,
    @Inject(ApiUrl) protected url: string
  ) {}

  register(email: string, password: string): Observable<boolean> {
    const body = { email, password };
    return this.http.post(`${this.url}/api/login`, body);
  }

  login(email: string, password: string): Observable<boolean> {}
}
