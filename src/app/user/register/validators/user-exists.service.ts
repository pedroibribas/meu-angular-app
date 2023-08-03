import { Injectable } from '@angular/core';
import { RegisterService } from '../register.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { first, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserExistsService {

  constructor(private registerService: RegisterService) { }

  /**
   * @description
   * Custom validator assíncrono que exige que o nome de usuário não
   * exista ainda na base de dados.
   * 
   * @returns Um objeto JS com a propriedade `userExists` definida
   * como `true` caso a validação falhe; senão, é retornado `null`
   */
  userExists(): ValidationErrors | null {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        // mapeia o fluxo digitação x requisição
        switchMap((userName) => this.registerService.checkUserExists(userName)),
        // mapeia o resultado da requisição por um valor de validador
        map((userExists) => userExists ? { userExists: true } : null),
        // finaliza o fluxo
        first()
      );
    }
  }
}
