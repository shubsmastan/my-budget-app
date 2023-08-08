import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  url = environment.baseUrl;
  isLoggedIn = this.cookieService.get('accesstoken') ? true : false;
  error = '';
  errorSubject = new BehaviorSubject<string>(this.error);

  signIn(formData: { username: string; password: string }) {
    console.log(this.url);
    this.http
      .post(`${this.url}/users/signin/`, JSON.stringify(formData))
      .subscribe({
        next: (res: any) => {
          this.cookieService.set('accesstoken', res.token);
          this.isLoggedIn = true;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          if (err.error.error) {
            this.error = err.error.error;
            return;
          }
          this.error = 'Something went wrong. Please try again.';
          console.log(err);
        },
      });
  }

  signUp(formData: {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    confirm_password: string;
  }) {
    this.http
      .post(`${this.url}/users/signup/`, JSON.stringify(formData))
      .subscribe({
        next: (res: any) => {
          this.cookieService.set('accesstoken', res.token);
          this.isLoggedIn = true;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          if (err.error.error) {
            this.error = err.error.error;
            return;
          }
          this.error = 'Something went wrong. Please try again.';
          console.log(err);
        },
      });
  }

  signOut() {
    this.cookieService.delete('accesstoken');
    this.isLoggedIn = false;
    this.router.navigate(['/auth']);
  }
}
