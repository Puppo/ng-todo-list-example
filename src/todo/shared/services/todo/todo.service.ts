import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

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
        _sort: 'dueDate,id',
        _order: 'desc,asc',
      }
    };
    return this.http.get<ITodo[]>(`${this.url}${this.TODO_URL}`, options);
  }

  getById(token: string, todoId: number): Observable<ITodo> {
    const id = todoId.toString();
    const options = {
      headers: this.generateHeader(token),
      params: {
        id
      }
    };
    return this.http.get<ITodo>(`${this.url}${this.TODO_URL}`, options);
  }

  add(token: string, todo: ITodo): Observable<ITodo> {
    const body = todo;
    const options = {
      headers: this.generateHeader(token),
    };
    return this.http.post<ITodo>(`${this.url}${this.TODO_URL}`, body, options);
  }

  update(token: string, todo: ITodo): Observable<ITodo> {
    const body = todo;
    const id = todo.id.toString();
    const options = {
      headers: this.generateHeader(token),
      params: {
        id
      }
    };
    return this.http.put<ITodo>(`${this.url}${this.TODO_URL}`, body, options);
  }

  protected generateHeader(token: string): {[header: string]: string | string[]} {
    return {
      'x-auth': token
    };
  }
}
