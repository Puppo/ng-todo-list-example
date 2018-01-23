import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import * as fromStore from '../../../store';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(protected store: Store<fromStore.IAuthState>) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.store.select(fromStore.getLoginTokenSelector)
    .pipe(
      map(x => !!x)
    );
  }
}
