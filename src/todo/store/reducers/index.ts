import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromTodoAdd from './todo-add.reducer';
import * as fromTodoList from './todo-list.reducer';
import { InjectionToken, inject } from '@angular/core';

export interface ITodoState {
  add: fromTodoAdd.ITodoAddState;
  list: fromTodoList.ITodoListState;
}

export function todoReducers() {
  const todoAddServ = inject(fromTodoAdd.TodoAddReducerService);
  const todoListServ = inject(fromTodoList.TodoListReducerService);

  return {
    add: todoAddServ.reducer.bind(todoAddServ),
    list: todoListServ.reducer.bind(todoListServ),
  };
}

export const TODO_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<ITodoState>>('Todo Reducers', {
  factory: todoReducers
});

export const TodoServicesReducers: any[] = [fromTodoAdd.TodoAddReducerService, fromTodoList.TodoListReducerService];

export const getTodoSelector = createFeatureSelector<ITodoState>(
  'todo'
);
