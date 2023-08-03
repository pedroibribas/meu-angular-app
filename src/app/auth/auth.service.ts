import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, tap } from 'rxjs';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  authenticate(userName: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post(
      `''/login`,
      { userName, password },
      { observe: 'response' }
    ).pipe(
      tap((res) => {
        const token = res.headers.get('x-access-token') ?? '';
        this.userService.saveToken(token);
      })
    );
  }
}
