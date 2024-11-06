import { inject, Injectable } from "@angular/core";
import { UserDataService } from "src/app/services/user-data/user-data.service";
import { UserStore } from "./user.store";
import { finalize, Observable, tap } from "rxjs";
import { IUser } from "src/app/entities/user";

@Injectable({ providedIn: 'root' })
export class UserService {
    readonly #userDataService = inject(UserDataService);
    readonly #userStore = inject(UserStore);

    loadAll(): Observable<IUser[]> {
        this.#userStore.setLoading(true);
        return this.#userDataService.loadAll().pipe(
            tap(users => this.#userStore.set(users)),
            finalize(() => this.#userStore.setLoading(false)),
        );
    }

    add(user: Omit<IUser, 'id'>) {
        this.#userStore.setLoading(true);
        return this.#userDataService.add(user).pipe(
            tap(user => this.#userStore.add(user)),
            finalize(() => this.#userStore.setLoading(false)),
        );
    }

    toggleActive(id: string) {
        this.#userStore.setLoading(true);
        return this.#userDataService.toggleActive(id).pipe(
            tap(user => this.#userStore.replace(id, user)),
            finalize(() => this.#userStore.setLoading(false)),
        );
    }
}
