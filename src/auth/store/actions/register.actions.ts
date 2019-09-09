import { createAction, props } from '@ngrx/store';
import { IRegisterActionProps, IRegisterFailActionProps } from './register.actions.model';

export const REGISTER_ACTION = '[Auth] Register';
export const registerAction = createAction(REGISTER_ACTION, props<IRegisterActionProps>());

export const REGISTER_SUCCESS_ACTION = '[Auth] Register Success';
export const registerSuccessAction = createAction(REGISTER_SUCCESS_ACTION);

export const REGISTER_FAIL_ACTION = '[Auth] Register Fail';
export const registerFailAction = createAction(REGISTER_FAIL_ACTION, props<IRegisterFailActionProps>());
