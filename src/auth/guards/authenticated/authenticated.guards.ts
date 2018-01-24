import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import * as fromRouteStore from '../../../app/store';
import * as fromAuthStore from '../../store';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(protected store: Store<fromAuthStore.IAuthState>) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.store.select(fromAuthStore.getLoginTokenSelector)
    .pipe(
      map(x => !!x),
      tap(x => {
        if (!x) {
          this.store.dispatch(new fromRouteStore.Go({
            path: ['/auth']
          }));
        }
      })
    );
  }
}
