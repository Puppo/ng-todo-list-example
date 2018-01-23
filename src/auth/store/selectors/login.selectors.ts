import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLogin from '../reducers/login.reducer';

export const getLoginSelector = createSelector(
  fromFeature.getAuthSelector,
  (state: fromFeature.IAuthState) => state.login
);

export const getLoginEmailSelector = createSelector(
  getLoginSelector,
  (state: fromLogin.ILoginState) => state.email
);

export const getLoginTokenSelector = createSelector(
  getLoginSelector,
  (state: fromLogin.ILoginState) => state.token
);

export const getLoginLoadingSelector = createSelector(
  getLoginSelector,
  (state: fromLogin.ILoginState) => state.loading
);

export const getLoginErrorSelector = createSelector(
  getLoginSelector,
  (state: fromLogin.ILoginState) => state.error
);
