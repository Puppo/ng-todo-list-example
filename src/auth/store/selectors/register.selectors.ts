import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromRegister from '../reducers/register.reducer';

export const getRegisterSelector = createSelector(
  fromFeature.getAuthSelector,
  (state: fromFeature.IAuthState) => state.register
);

export const getRegisterLoadingSelector = createSelector(
  getRegisterSelector,
  fromRegister.getRegisterLoading
);

export const getRegisterSuccessSelector = createSelector(
  getRegisterSelector,
  fromRegister.getRegisterSuccess
);

export const getRegisterErrorSelector = createSelector(
  getRegisterSelector,
  fromRegister.getRegisterError
);

export const getRegisterHasErrorSelector = createSelector(
  getRegisterSelector,
  fromRegister.getRegisterHasError
);

export const getRegisterErrorMessageSelector = createSelector(
  getRegisterSelector,
  fromRegister.getRegisterErrorMessage
);
