import { Injectable } from "@angular/core";
import * as uniqid from 'uniqid';
import { delay, Observable, of } from "rxjs";

import { IUser } from "../../entities/user";
import { USERS } from "./user.mock";

@Injectable({ providedIn: 'root' })
export class UserService {
    readonly #delay = 500;
    readonly #users = [...USERS];

    loadAll(): Observable<IUser[]> {
        return of(this.#users).pipe(delay(this.#delay));
    }

    add(userData: Omit<IUser, 'id'>): Observable<IUser> {
        const user: IUser = {
            id: uniqid(),
            ...userData,
        };

        this.#users.push(user);

        return of(user).pipe(delay(this.#delay)); 
    }
}
