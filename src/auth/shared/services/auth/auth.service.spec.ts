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

  const tokenId = 12343;
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
      'should call http GET method with email and password params and return success',
      async(
        inject([HttpTestingController], (httpMock: HttpTestingController) => {
          let id;
          service.login(email, password).subscribe(res => id = res);

          const req = httpMock.expectOne(r => r.url.indexOf(`${authUrl}`) !== -1);
          const params = req.request.params;

          expect(req.request.method).toEqual('GET');

          expect(params.get('email')).toEqual(email);
          expect(params.get('password')).toEqual(password);

          req.flush([{id: tokenId}]);

          expect(id).toEqual(tokenId);
        })
      )
    );

    it(
      'should call http GET but return Invalid login',
      async(
        inject([HttpTestingController], (httpMock: HttpTestingController) => {
          let error;
          service.login(email, password).subscribe(() => {}, err => { error = err; });

          const req = httpMock.expectOne(r => r.url.indexOf(`${authUrl}`) !== -1);
          const params = req.request.params;

          expect(req.request.method).toEqual('GET');

          expect(params.get('email')).toEqual(email);
          expect(params.get('password')).toEqual(password);

          req.flush({});

          expect(error).toEqual(new Error('Invalid login'));

        })
      )
    );
  });
});
