import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [MainComponent, ModalComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
