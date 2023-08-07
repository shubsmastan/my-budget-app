import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  isLoggedIn = this.cookieService.get('token') ? true : false;
  error = '';
  errorSubject = new BehaviorSubject<string>(this.error);

  login(formData: { username: string; password: string }) {
    this.http
      .post('http://localhost:8000/users/signin/', JSON.stringify(formData))
      .subscribe({
        next: (res: any) => {
          this.cookieService.set('token', res.accessToken);
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

  logout() {
    this.cookieService.delete('token');
    this.isLoggedIn = false;
    this.router.navigate(['/auth']);
  }
}
