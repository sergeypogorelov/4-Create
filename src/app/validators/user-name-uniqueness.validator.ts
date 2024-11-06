import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable, of } from "rxjs";
import { UserDataService } from "../services/user-data/user-data.service";

export const userNameUniquenessValidator = (userDataService: UserDataService): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) {
            return of(null);
        }

        return userDataService.checkNameUniqueness(control.value).pipe(map(isUnique => {
            if (isUnique) {
                return null;
            }

            return {
                userNameUniqueness: `Name ${control.value} is already in use`,
            }
        }))
    };
}