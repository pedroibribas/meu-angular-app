import { FormGroup, ValidationErrors } from "@angular/forms";

/**
 * @description
 * Custom validator de formulário que exige que o nome de usuário e a senha 
 * sejam diferentes.
 * 
 * @returns Um objeto JS com a propriedade `userPasswordEqual` definida
 * como `true` caso a validação falhe; senão, é retornado `null`
 */
export function userPasswordEqualValidator(form: FormGroup): ValidationErrors | null {
    const userName = form.get('userName')?.value ?? '';
    const password = form.get('password')?.value ?? '';

    if (userName.trim() + password.trim()) {
        return userName !== password ? null : { userPasswordEqual: true };
    }

    return null;
}