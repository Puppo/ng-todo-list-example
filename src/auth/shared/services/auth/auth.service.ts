import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiUrl } from '../../../../constants';
import { IUser } from '../../models';

@Injectable()
export class AuthService {
  readonly AUTH_URL = '/auths';
  constructor(
    protected http: HttpClient,
    @Inject(ApiUrl) protected url: string
  ) {}

  register(email: string, password: string): Observable<void> {
    const body = { email, password };
    return this.http.post<void>(`${this.url}${this.AUTH_URL}`, body);
  }

  login(email: string, password: string): Observable<string> {
    const options = {
      params: {
        email,
        password
      }
     };
    return this.http.get<IUser[]>(`${this.url}${this.AUTH_URL}`, options)
    .pipe(
      map(x => {
        if (!!x && x.length === 1) {
          return x[0].id;
        }
        throw new Error('Invalid login');
      })
    );
  }
}
