import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  constructor(
    public dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {}

  @Input() open: boolean = false;

  @Input() close: () => void = () => {};

  id: string | null = this.route.snapshot.paramMap.get('id');
  category: any = this.dashboardService.categories.find(
    (cat: any) => (cat.id = this.id)
  );
  entries: any = [];
}
