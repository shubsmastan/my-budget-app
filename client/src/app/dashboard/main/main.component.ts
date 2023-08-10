import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(
    public dashboardService: DashboardService,
    private router: Router
  ) {}

  isModalOpen = false;

  categoriesWithImages = [
    'Bills',
    'Charity',
    'Eating out',
    'Entertainment',
    'Expenses',
    'Finances',
    'Gifts',
    'Groceries',
    'Holidays',
    'Personal care',
    'Shopping',
    'Transport',
  ];

  ngOnInit() {
    this.dashboardService.getUser();
    this.dashboardService.getCategories();
  }

  setModalOpen = (id: string) => {
    this.isModalOpen = true;
    this.router.navigate(['/dashboard/' + id]);
  };

  setModalClosed = () => {
    this.isModalOpen = false;
    this.router.navigate(['/dashboard/main']);
  };
}
