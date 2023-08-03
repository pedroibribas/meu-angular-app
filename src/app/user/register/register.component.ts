import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { NewUser } from './new-user';
import { UserExistsService } from './validators/user-exists.service';
import { lowercaseValidator } from './validators/lowercase.validator';
import { userPasswordEqualValidator } from './validators/user-password-equal.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  newUserForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private userExistsService: UserExistsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newUserForm = this.formBuilder.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.email]],
        userName: [
          '',
          [Validators.required, lowercaseValidator],
          [this.userExistsService.userExists()]
        ],
        password: ['', [Validators.required]]
      },
      {
        validators: userPasswordEqualValidator
      }
    );
  }

  get fullName() { return this.newUserForm.get('fullName'); }
  get email() { return this.newUserForm.get('email'); }
  get userName() { return this.newUserForm.get('userName'); }
  get password() { return this.newUserForm.get('password'); }

  register() {
    if (this.newUserForm.invalid) {
      throw new Error('O formulário de registro de usuário é inválido.');
    }

    const newUser = this.newUserForm.getRawValue() as NewUser;

    this.registerService.createNewUser(newUser).subscribe({
      next: (v) => {
        this.router.navigate(['home']);
      },
      error: (e: HttpErrorResponse) => {
        console.error(e.message);
      }
    });
  }
}
