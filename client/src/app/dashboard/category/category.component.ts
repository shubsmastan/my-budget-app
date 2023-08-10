import { Component, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('categoryRef') divCategory!: ElementRef;

  @Input() open: boolean = false;

  @Input() close: () => void = () => {};

  id: number = parseInt(this.route.snapshot.paramMap.get('id')!);
  category: any = this.dashboardService.categories.find(
    (cat: any) => cat.id === this.id
  );
  entries: any = [];
  date: string = new Date(Date.now()).toISOString().match(/(.{1,7})/g)![0];

  ngOnInit() {
    console.log(this.date);
  }

  modalClick(event: Event) {
    if (event.target === this.divCategory.nativeElement) {
      this.close();
    }
  }
}
