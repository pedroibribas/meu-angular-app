import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  userName: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    this.authService.authenticate(this.userName, this.password)
      .subscribe({
        next: (v) => {
          this.router.navigate(['home']);
        },
        error: (e: HttpErrorResponse) => {
          console.error(e.message);
        }
      });
  }

}
