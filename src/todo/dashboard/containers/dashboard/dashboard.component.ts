import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromStore from '../../../store';
import { ITodo } from '../../../shared/models';

@Component({
  selector: 'todo-dashboard',
  template: `
  <todo-add
    (submitted)="add($event)">
  </todo-add>

  <todo-list
    [todos]="todos$ | async"
    (delete)="delete($event)">
  </todo-list>
  `
})
export class DashboardComponent implements OnInit {
  todos$ = this.store.select(fromStore.getTodoListTodosSelector);
  constructor(protected store: Store<fromStore.ITodoState>) {}

  ngOnInit(): void {
    this.store.dispatch(fromStore.todoListAction());
  }
  add(form: FormGroup): void {
    const description = form.get('description').value;
    const dueDateIso = form.get('dueDate').value;
    const dueDate = !!dueDateIso ? Date.parse(dueDateIso) : null;
    this.store.dispatch(fromStore.todoAddAction({description, dueDate}));
  }

  delete(todo: ITodo): void {
    const { id } = todo;
    this.store.dispatch(fromStore.todoDeleteAction({id}));
  }
}
