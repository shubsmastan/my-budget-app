import { Component } from '@angular/core';
import { CATEGORIES } from '../mock-categories';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  categories = CATEGORIES;
}
