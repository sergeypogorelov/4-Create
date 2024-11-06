import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IUser } from "src/app/entities/user";
import { DialogRef } from "@angular/cdk/dialog";
import { UserDataService } from "src/app/services/user-data/user-data.service";

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
    readonly #userDataService = inject(UserDataService);

    readonly form = this.#fb.group({
        name: new FormControl('', { nonNullable: true }),
        active: new FormControl(false, { nonNullable: true }),
    });

    submit(ev: Event) {
        ev.preventDefault();
        this.#userDataService.add(this.form.value as IUser).subscribe(() => {
            this.#dialogRef.close();
        });
        
    }
}
