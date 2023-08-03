import { Injectable } from '@angular/core';
import { NewUser } from './new-user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  createNewUser(newUser: NewUser): Observable<any> {
    return this.http.post(`''/user/signup`, {
      fullName: newUser.fullName,
      email: newUser.email,
      userName: newUser.userName,
      password: newUser.password
    });
  }

  checkUserExists(userName: string) {
    return this.http.get(`''/user/exists/${userName}`);
  }
}
