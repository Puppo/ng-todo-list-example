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

import { ApiUrl } from '../../../../constants';
import { ITodo } from '../../models';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  const todoUrl = '/todos';
  const token = 'testing_token';
  const email = 'test@test.it';
  const todoId = 98342;
  const todo: ITodo = {
    description: 'Test 1',
    dueDate: Date.now(),
    completed: false,
    email,
    createAt: Date.now(),
    updateAt: Date.now()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        TodoService,
        { provide: ApiUrl, useValue: 'http://localhost' }
      ]
    });

    service = TestBed.get(TodoService);
  });

  afterEach(
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      httpMock.verify();
    })
  );

  describe('TODO_URL', () => {
    it(`should is "${todoUrl}"`, () => {
      expect(service.TODO_URL).toEqual(todoUrl);
    });
  });

  describe('get', () => {
    it(
      'should call http GET method with email and _sort and _order params',
      async(
        inject([HttpTestingController], (httpMock: HttpTestingController) => {
          service.get(token, email).subscribe();

          const req = httpMock.expectOne(
            r => r.url.indexOf(`${todoUrl}`) !== -1
          );
          const params = req.request.params;

          expect(req.request.method).toEqual('GET');

          expect(req.request.headers.get('x-auth')).toEqual(token);

          expect(params.get('email')).toEqual(email);
          expect(params.get('_sort')).toEqual('completed,dueDate,id');
          expect(params.get('_order')).toEqual('asc,asc,asc');
        })
      )
    );
  });

  describe('add', () => {
    it(
      'should call http POST method with todo',
      async(
        inject([HttpTestingController], (httpMock: HttpTestingController) => {
          service.add(token, todo).subscribe();

          const req = httpMock.expectOne(
            r => r.url.indexOf(`${todoUrl}`) !== -1
          );
          const body = req.request.body;

          expect(req.request.method).toEqual('POST');

          expect(req.request.headers.get('x-auth')).toEqual(token);

          expect({ ...body }).toEqual({ ...todo });
        })
      )
    );
  });

  describe('delete', () => {
    it(
      'should call http DELETE method with todo id',
      async(
        inject([HttpTestingController], (httpMock: HttpTestingController) => {
          service.delete(token, todoId).subscribe();

          const req = httpMock.expectOne(r =>
            r.url.endsWith(`${todoUrl}/${todoId}`)
          );
          const params = req.request.params;

          expect(req.request.method).toEqual('DELETE');

          expect(req.request.headers.get('x-auth')).toEqual(token);
        })
      )
    );
  });
});
