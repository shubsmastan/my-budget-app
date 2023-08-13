import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  url = environment.baseUrl;
  user: any;
  categories: any[] = [];
  entries: any[] = [];
  isLoading = true;
  error = '';
  categorySubject = new BehaviorSubject<any[]>(this.categories);
  errorSubject = new BehaviorSubject<string>(this.error);

  getUser() {
    this.http
      .get(`${this.url}/users/`, {
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
      .get(`${this.url}/categories/`, {
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

  newCategory() {
    this.http
      .post(
        `${this.url}/categories/`,
        JSON.stringify({ name: 'New Category' }),
        {
          headers: {
            Authorization: `Token ${this.cookieService.get('accesstoken')}`,
          },
        }
      )
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

  deleteCategory(id: number) {
    this.http
      .delete(`${this.url}/categories/${id}`, {
        headers: {
          Authorization: `Token ${this.cookieService.get('accesstoken')}`,
        },
      })
      .subscribe({
        next: (res: any) => {
          if (res.error) {
            this.error = res.error;
            console.log(this.error);
            return;
          }
          this.categories = this.categories.filter((cat: any) => cat.id !== id);
          return res;
        },
        error: (err) => {
          if (err.error.error) {
            this.error = err.error.error;
            return;
          }
          this.error = 'Something went wrong. Please try again.';
          console.log(err);
          this.isLoading = false;
        },
      });
  }

  getEntries() {
    this.http
      .get(`${this.url}/entries/`, {
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
          this.entries = res;
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

  newEntry(category_id: number, date: string, budget: number, spend: number) {
    if (!spend) {
      spend === 0;
    }
    this.http
      .post(
        `${this.url}/entries/`,
        JSON.stringify({ category_id, date, budget, spend: spend }),
        {
          headers: {
            Authorization: `Token ${this.cookieService.get('accesstoken')}`,
          },
        }
      )
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
