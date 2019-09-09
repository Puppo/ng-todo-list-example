import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiUrl } from '../../../../constants';
import { ITodo } from '../../models';

@Injectable()
export class TodoService {
  readonly TODO_URL = '/todos';
  constructor(
    protected http: HttpClient,
    @Inject(ApiUrl) protected url: string
  ) {}

  get(token: string, email: string): Observable<ITodo[]> {
    const options = {
      headers: this.generateHeader(token),
      params: {
        email,
        _sort: 'completed,dueDate,id',
        _order: 'asc,asc,asc',
      }
    };
    return this.http.get<ITodo[]>(`${this.url}${this.TODO_URL}`, options);
  }

  add(token: string, todo: ITodo): Observable<ITodo> {
    const body = todo;
    const options = {
      headers: this.generateHeader(token),
    };
    return this.http.post<ITodo>(`${this.url}${this.TODO_URL}`, body, options);
  }

  delete(token: string, todoId: number): Observable<ITodo> {
    const id = todoId.toString();
    const options = {
      headers: this.generateHeader(token),
    };
    return this.http.delete<ITodo>(`${this.url}${this.TODO_URL}/${id}`, options);
  }

  protected generateHeader(token: string): HttpHeaders {
    const headers = new HttpHeaders({
      'x-auth': token.toString()
    });
    return headers;
  }
}
