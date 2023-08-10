import { Component, ElementRef, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(
    public dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {}

  @ViewChild('modalRef') divCategory!: ElementRef;

  id: string | null = this.route.snapshot.paramMap.get('id');
  category: any = this.dashboardService.categories.find(
    (cat: any) => (cat.id = this.id)
  );

  @Input() open: boolean = false;

  @Input() close: () => void = () => {};

  modalClick(event: Event) {
    if (event.target === this.divCategory.nativeElement) {
      this.close();
    }
  }
}
