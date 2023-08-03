import { AbstractControl, ValidationErrors } from "@angular/forms";

/**
 * @description
 * Custom validator que exige que o nome de usuário seja minúsculo.
 * 
 * @returns Um objeto JS com a propriedade `lowercase` definida
 * como `true` caso a validação falhe; senão, é retornado `null`
 */
export function lowercaseValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;

    if (value !== value.toLowerCase()) {
        return { lowercase: true }
    }

    return null;
}