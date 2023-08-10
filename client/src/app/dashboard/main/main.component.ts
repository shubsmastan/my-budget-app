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

  isCategoryOpen = false;
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

  setCategoryOpen = (id: string) => {
    document.body.style.overflow = 'hidden';
    document.getElementById('main')!.style.paddingRight = '0';
    this.isCategoryOpen = true;
    this.router.navigate(['/dashboard/' + id]);
  };

  setCategoryClosed = () => {
    document.body.style.overflow = 'auto';
    document.getElementById('main')!.style.paddingRight = '0';
    this.isCategoryOpen = false;
    this.router.navigate(['/dashboard/main']);
  };

  setModalOpen = (id: string) => {
    document.body.style.overflow = 'hidden';
    document.getElementById('main')!.style.paddingRight = '0';
    this.isModalOpen = true;
    this.router.navigate(['/dashboard/' + id + '/delete']);
  };

  setModalClosed = () => {
    document.body.style.overflow = 'auto';
    document.getElementById('main')!.style.paddingRight = '0';
    this.isModalOpen = false;
    this.router.navigate(['/dashboard/main']);
  };
}
