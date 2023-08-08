import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {}

  isRegistering = false;

  authForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  regForm = this.formBuilder.group({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    confirm_password: '',
  });

  onSubmit(e: Event, guest: boolean, isRegistering: boolean) {
    e.preventDefault();
    let username, password;
    if (isRegistering) {
      const first_name = this.regForm.value.first_name!;
      const last_name = this.regForm.value.last_name!;
      username = this.regForm.value.username!;
      password = this.regForm.value.password!;
      const confirm_password = this.regForm.value.confirm_password!;
      this.authService.signUp({
        first_name,
        last_name,
        username,
        password,
        confirm_password,
      });
      this.isRegistering = true;
      return;
    }
    if (guest) {
      username = 'guest';
      password = 'guest123';
    } else {
      username = this.authForm.value.username!;
      password = this.authForm.value.password!;
    }
    this.authService.signIn({ username, password });
  }

  toggleFormState() {
    this.isRegistering = !this.isRegistering;
  }
}
