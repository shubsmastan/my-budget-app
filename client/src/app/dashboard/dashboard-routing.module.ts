import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CategoryComponent } from './category/category.component';
import { authGuard } from '../auth/auth.guard';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: MainComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard/:id',
    component: CategoryComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
