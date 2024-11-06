import { Injectable } from "@angular/core";
import { guid } from '@datorama/akita';
import { delay, Observable, of } from "rxjs";

import { IUser } from "../../entities/user";
import { USERS } from "./user-data.mock";

@Injectable({ providedIn: 'root' })
export class UserDataService {
    readonly #delay = 500;
    readonly #users = [...USERS];

    loadAll(): Observable<IUser[]> {
        return of(this.#users).pipe(delay(this.#delay));
    }

    add(userData: Omit<IUser, 'id'>): Observable<IUser> {
        const user: IUser = {
            id: guid(),
            ...userData,
        };

        this.#users.push(user);

        return of(user).pipe(delay(this.#delay)); 
    }
}
