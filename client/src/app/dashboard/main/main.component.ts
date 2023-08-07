import { Component, SimpleChanges } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(public dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getUser();
    this.dashboardService.getCategories();
  }
}
