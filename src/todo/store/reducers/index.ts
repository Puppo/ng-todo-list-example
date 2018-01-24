import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromTodoAdd from './todo-add.reducers';
import * as fromTodoList from './todo-list.reducers';

export interface ITodoState {
  add: fromTodoAdd.ITodoAddState;
  list: fromTodoList.ITodoListState;
}

export const reducers: ActionReducerMap<ITodoState> = {
  add: fromTodoAdd.reducer,
  list: fromTodoList.reducers
};

export const getTodoSelector = createFeatureSelector<ITodoState>(
  'todo'
);
