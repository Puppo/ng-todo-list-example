import {
  HttpClientModule,
  HttpClient,
  HttpRequest,
  HttpParams
} from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { of } from 'rxjs/observable/of';

import { ApiUrl } from '../../../../constants';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const email = 'test@test.it';
  const password = 'fsdf$5res';
  const authUrl = '/auths';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: ApiUrl, useValue: 'http://localhost' }
      ]
    });

    service = TestBed.get(AuthService);
  });

  afterEach(
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      httpMock.verify();
    })
  );

  describe('AUTH_URL', () => {
    it(`should is "${authUrl}"`, () => {
      expect(service.AUTH_URL).toEqual(authUrl);
    });
  });

  describe('register', () => {
    it(
      'should call http POST method with email and password params',
      async(
        inject([HttpTestingController], (httpMock: HttpTestingController) => {
          service.register(email, password).subscribe();

          const req = httpMock.expectOne(r => r.url.indexOf(`${authUrl}`) !== -1);
          const body = req.request.body;

          expect(req.request.method).toEqual('POST');

          expect(body.email).toEqual(email);
          expect(body.password).toEqual(password);
        })
      )
    );
  });

  describe('login', () => {
    it(
      'should call http GET method with email and password params',
      async(
        inject([HttpTestingController], (httpMock: HttpTestingController) => {
          service.login(email, password).subscribe();

          const req = httpMock.expectOne(r => r.url.indexOf(`${authUrl}`) !== -1);
          const params = req.request.params;

          expect(req.request.method).toEqual('GET');

          expect(params.get('email')).toEqual(email);
          expect(params.get('password')).toEqual(password);
        })
      )
    );
  });
});
