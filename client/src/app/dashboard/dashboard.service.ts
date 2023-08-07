import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  user: any;
  categories: any = [];
  isLoading = true;
  error = '';
  categorySubject = new BehaviorSubject<any[]>(this.categories);
  errorSubject = new BehaviorSubject<string>(this.error);

  getUser() {
    this.http
      .get('http://localhost:8000/users/', {
        headers: {
          Authorization: `Token ${this.cookieService.get('accesstoken')}`,
        },
      })
      .subscribe({
        next: (res: any) => {
          if (res.error) {
            console.log(res);
            return;
          }
          this.user = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getCategories() {
    this.http
      .get('http://localhost:8000/categories/', {
        headers: {
          Authorization: `Token ${this.cookieService.get('accesstoken')}`,
        },
      })
      .subscribe({
        next: (res: any) => {
          if (res.error) {
            this.error = res.error;
            console.log(this.error);
            this.isLoading = false;
            return;
          }
          this.categories = res;
          this.isLoading = false;
          return res;
        },
        error: (err) => {
          if (err.error.error) {
            this.error = err.error.error;
            this.isLoading = false;
            return;
          }
          this.error = 'Something went wrong. Please try again.';
          console.log(err);
          this.isLoading = false;
        },
      });
  }
}
