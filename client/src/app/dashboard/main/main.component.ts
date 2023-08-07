import { Component } from '@angular/core';
import { CATEGORIES } from '../../mock-categories';

@Component({
  selector: 'app-dashboard',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  categories = CATEGORIES;
}
