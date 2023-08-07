import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  authForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {}

  onSubmit(e: Event) {
    e.preventDefault();
    const username = this.authForm.value.username!;
    const password = this.authForm.value.password!;
    this.authService.login({ username, password });
  }
}
