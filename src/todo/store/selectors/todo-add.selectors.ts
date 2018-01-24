import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromTodoAdd from '../reducers/todo-add.reducer';

export const getTodoAddSelector = createSelector(
  fromFeature.getTodoSelector,
  (state: fromFeature.ITodoState) => state.add
);

export const getTodoAddLoadingSelector = createSelector(
  getTodoAddSelector,
  fromTodoAdd.getTodoAddLoading
);

export const getTodoAddErrorSelector = createSelector(
  getTodoAddSelector,
  fromTodoAdd.getTodoAddError
);
