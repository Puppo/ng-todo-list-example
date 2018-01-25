import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLogin from '../reducers/login.reducer';

export const getLoginSelector = createSelector(
  fromFeature.getAuthSelector,
  (state: fromFeature.IAuthState) => state.login
);

export const getLoginEmailSelector = createSelector(
  getLoginSelector,
  fromLogin.getLoginEmail
);

export const getLoginTokenSelector = createSelector(
  getLoginSelector,
  fromLogin.getLoginToken
);

export const getLoginLoadingSelector = createSelector(
  getLoginSelector,
  fromLogin.getLoginLoading
);

export const getLoginErrorSelector = createSelector(
  getLoginSelector,
  fromLogin.getLoginError
);

export const getLoginHasErrorSelector = createSelector(
  getLoginSelector,
  fromLogin.getLoginHasError
);

export const getLoginErrorMessageSelector = createSelector(
  getLoginSelector,
  fromLogin.getLoginErrorMessage
);
