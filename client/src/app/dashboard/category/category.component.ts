import { Component, ElementRef, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  constructor(
    private formBuilder: FormBuilder,
    public dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {}

  @ViewChild('categoryRef') divCategory!: ElementRef;

  @Input() open: boolean = false;

  @Input() close: () => void = () => {};

  id: number = parseInt(this.route.snapshot.paramMap.get('id')!);
  date: string = new Date(Date.now()).toISOString().split('-', 2).join('-');
  stringDate: string = new Date(Date.now()).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });
  dateForm = this.formBuilder.group({
    date: this.date,
  });
  category: any = this.dashboardService.categories.find(
    (cat: any) => cat.id === this.id
  );
  entries: any = this.dashboardService.entries.filter(
    (entry) => entry.category_id === this.id
  );
  entry: any = this.entries.find(
    (entry: any) => entry.date === this.date + '-01'
  );

  ngOnChanges() {
    this.dateForm.valueChanges.subscribe((changes) => {
      this.date = changes.date!;
      this.entry = this.entries.find(
        (entry: any) => entry.date === this.date + '-01'
      );
    });
  }

  modalClick(event: Event) {
    if (event.target === this.divCategory.nativeElement) {
      this.close();
    }
  }
}
