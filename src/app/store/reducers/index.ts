import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params
} from "@angular/router";
import { createFeatureSelector, ActionReducerMap } from "@ngrx/store";
import { CustomSerializer, RouterStateUrl } from "./custom-serializer.service";

import * as fromRouter from "@ngrx/router-store";

export * from "./custom-serializer.service";

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
};

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>("routerReducer");
