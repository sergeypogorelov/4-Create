import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { IUserState, UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserQuery extends QueryEntity<IUserState> {
  readonly users$ = this.selectAll();

  constructor(protected override readonly store: UserStore) {
    super(store);
  }
}
