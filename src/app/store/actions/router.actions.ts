import { createAction, props } from '@ngrx/store';
import { IGoProps } from './router.actions.model';

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

export const go = createAction(GO, props<IGoProps>());

export const back = createAction(BACK);

export const forward = createAction(FORWARD);
