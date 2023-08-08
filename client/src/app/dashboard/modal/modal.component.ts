import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor() {}
  @Input() open: boolean = false;

  @Input() close: () => void = () => {};
}
