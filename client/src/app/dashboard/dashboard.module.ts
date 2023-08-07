import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
