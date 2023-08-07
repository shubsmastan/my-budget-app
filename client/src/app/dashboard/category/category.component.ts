import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  constructor(private route: ActivatedRoute) {}

  id: string | null = null;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
