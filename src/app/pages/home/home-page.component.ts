import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { UserService } from "../../services/user/user.service";
import { IUser } from "../../entities/user";
import { AddUserModalComponent } from "src/app/modals/add-user/add-user-modal.component";
import { BehaviorSubject, Subject, switchMap } from "rxjs";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MatTableModule, MatCheckboxModule, MatButtonModule, MatDialogModule],
    standalone: true,
})
export class HomePageComponent implements OnInit {
    readonly #dialog = inject(MatDialog);
    readonly #userService = inject(UserService);

    readonly loadDataSubject = new BehaviorSubject(null);
    readonly displayedColumns: (keyof IUser)[] = ['id', 'name', 'active'];
    readonly users$ = this.loadDataSubject.pipe(switchMap(() => this.#userService.loadAll()));

    ngOnInit() {
        this.loadDataSubject.next(null);
    }

    openAddUserModal() {
        const ref = this.#dialog.open(AddUserModalComponent);
        ref.afterClosed().subscribe(() => this.loadDataSubject.next(null));
    }
}
