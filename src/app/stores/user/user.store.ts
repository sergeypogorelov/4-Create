import { inject, Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";

import { IUser } from "../../entities/user";
import { UserDataService } from "src/app/services/user-data/user-data.service";

export interface IUserState extends EntityState<IUser, string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' })
export class UserStore extends EntityStore<IUserState> {
    constructor() {
        super();
    }
}
