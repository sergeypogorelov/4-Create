import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { UserDataService } from "../../services/user-data/user-data.service";
import { IUser } from "../../entities/user";
import { AddUserModalComponent } from "src/app/modals/add-user/add-user-modal.component";
import { BehaviorSubject, map, Subject, switchMap } from "rxjs";
import { UserQuery } from "src/app/stores/user/user.query";
import { UserService } from "src/app/stores/user/user.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MatTableModule, MatCheckboxModule, MatButtonModule, MatDialogModule],
    standalone: true,
})
export class HomePageComponent implements OnInit {
    readonly #dialog = inject(MatDialog);
    readonly #userQuery = inject(UserQuery);
    readonly #userService = inject(UserService);

    readonly displayedColumns: (keyof IUser)[] = ['id', 'name', 'active'];
    readonly users$ = this.#userQuery.users$;
    readonly addButtonDisabled$ = this.users$.pipe(map(users => {
        return users.length >= 5 || !users.every(i => i.active);
    }));

    ngOnInit() {
        this.#userService.loadAll().pipe(untilDestroyed(this)).subscribe();
    }

    openAddUserModal() {
        this.#dialog.open(AddUserModalComponent);
    }

    toggleUserActivity(userId: string) {
        this.#userService.toggleActive(userId).pipe(untilDestroyed(this)).subscribe();
    }
}
