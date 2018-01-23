import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromRegister from '../reducers/register.reducer';

export const getRegisterSelector = createSelector(
  fromFeature.getAuthSelector,
  (state: fromFeature.IAuthState) => state.register
);

export const getRegisterLoadingSelector = createSelector(
  getRegisterSelector,
  (state: fromRegister.IRegisterState) => state.loading
);

export const getRegisterSuccessSelector = createSelector(
  getRegisterSelector,
  (state: fromRegister.IRegisterState) => state.success
);

export const getRegisterErrorSelector = createSelector(
  getRegisterSelector,
  (state: fromRegister.IRegisterState) => state.error
);
