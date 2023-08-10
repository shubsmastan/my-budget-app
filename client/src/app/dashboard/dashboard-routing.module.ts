import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { authGuard } from '../auth/auth.guard';
import { ModalComponent } from './modal/modal.component';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
      {
        path: ':id',
        component: MainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
