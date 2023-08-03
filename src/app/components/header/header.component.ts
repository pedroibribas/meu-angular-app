import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  user$;
  loginLink = '/user/login';
  registerLink = '/user/register';
  homeLink = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.user$ = userService.getUser();
  }

  logout() {
    this.userService.logout();
    this.router.navigate([this.homeLink]);
  }
}
