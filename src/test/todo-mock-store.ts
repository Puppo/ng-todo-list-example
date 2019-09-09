import {Observable, BehaviorSubject, of} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Action } from '@ngrx/store';

export class MockStore<T> extends BehaviorSubject<T> {
  constructor(private _initialState: T) {
    super(_initialState);
  }

  dispatch = (action: Action): void => {
  }

  select = <K, R>(pathOrMapFn: any, ...paths: string[]): Observable<R> => {
    return this.pipe(
      map(pathOrMapFn),
      catchError(err => of(err))
    );
  }
}

export function getStoreStub(): any {
  return new MockStore(undefined);
}
