import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromTodoAdd from './todo-add.reducer';
import * as fromTodoList from './todo-list.reducer';

export interface ITodoState {
  add: fromTodoAdd.ITodoAddState;
  list: fromTodoList.ITodoListState;
}

export const reducers: ActionReducerMap<ITodoState> = {
  add: fromTodoAdd.reducer,
  list: fromTodoList.reducer
};

export const getTodoSelector = createFeatureSelector<ITodoState>(
  'todo'
);
