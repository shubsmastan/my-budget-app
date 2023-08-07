import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  categories: any = [];
  isLoading = true;
  error = '';
  categorySubject = new BehaviorSubject<any[]>(this.categories);
  errorSubject = new BehaviorSubject<string>(this.error);

  getCategories() {
    this.http.get('http://localhost:8000/categories/').subscribe({
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
