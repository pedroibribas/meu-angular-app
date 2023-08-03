import { Injectable } from '@angular/core';
import { TokenService } from '../token.service';
import jwtDecode from 'jwt-decode';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>({});

  constructor(private tokenService: TokenService) {
    if (tokenService.hasToken()) {
      this.decodeJWT();
    }
  }

  private decodeJWT() {
    const token = this.tokenService.getToken();
    const user = jwtDecode(token) as User;
    this.userSubject.next(user);
  }

  /**
   * @description
   * Método que expõe os dados do usuário logado para a aplicação.
   */
  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }
  /**
   * @returns Uma flag para a existência de token na memória.
   */
  isLoggedIn(): boolean {
    return this.tokenService.hasToken();
  }
  /**
   * @description
   * Método que salva o token na memória do navegador e
   * atualiza os dados do usuário para a aplicação com base
   * no token.
   */
  saveToken(token: string) {
    this.tokenService.saveToken(token);
    this.decodeJWT();
  }
  /**
   * @description
   * Remove o token do usuário da memória e atualiza os dados do usuário
   * expostos à aplicação.
   */
  logout() {
    this.tokenService.removeToken();
    this.userSubject.next({});
  }
}
/**
 * Os dados do usuário, que são obtidos via token,
 * são gerenciados em um BehaviorSubject, i.e., um
 * observável que mantém estados.
 * ```ts
 * private userSubject = new BehaviorSubject<User>({});
 * ```
 * E assim que os dados do usuário são obtidos do token,
 * esses dados são salvos no `userSubject`
 * ```ts
 * this.userSubject.next(user);
 * ```
 * E para expôr os dados sem permitir que outros arquivos
 * manipulem o estado do userSubject, ele é exposto como um
 * observável.
 * ```ts
 * this.userSubject.asObservable();
 * ```
 */