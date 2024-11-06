import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IUser } from "src/app/entities/user";
import { DialogRef } from "@angular/cdk/dialog";
import { UserService } from "src/app/stores/user/user.service";
import { UserQuery } from "src/app/stores/user/user.query";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { userNameUniquenessValidator } from "src/app/validators/user-name-uniqueness.validator";
import { UserDataService } from "src/app/services/user-data/user-data.service";
import { BehaviorSubject, combineLatest, map, merge, of, publishLast, share, switchMap, take } from "rxjs";

@UntilDestroy()
@Component({
    selector: 'app-add-user-modal',
    templateUrl: './add-user-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule
    ],
    standalone: true,
})
export class AddUserModalComponent {
    readonly #fb = inject(FormBuilder);
    readonly #dialogRef = inject(DialogRef);
    readonly #userQuery = inject(UserQuery);
    readonly #userService = inject(UserService);
    readonly #userDataService = inject(UserDataService);

    readonly form = this.#fb.group({
        name: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
            asyncValidators: [userNameUniquenessValidator(this.#userDataService)],
        }),
        active: new FormControl(false, { nonNullable: true }),
    });

    readonly isLoading$ = this.#userQuery.selectLoading().pipe(untilDestroyed(this));
    readonly isSubmitDisabled$ = combineLatest([
        this.isLoading$,
        this.form.statusChanges.pipe(share({ connector: () => new BehaviorSubject(this.form.status)})),
    ]).pipe(
        map(([isLoading]) => {
            const { pending, invalid } = this.form;
            return isLoading || pending || invalid;
        })
    );

    get nameCtrl(): AbstractControl<string> {
        return this.form.controls.name;
    }

    submit(ev: Event) {
        ev.preventDefault();
        this.#userService.add(this.form.value as IUser)
            .pipe(untilDestroyed(this))
            .subscribe(() => this.#dialogRef.close());
    }
}
