import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { AccountPlanComponent } from './pages/account-plan/account-plan';
import { UserManagementComponent } from './pages/admin/user-management/user-management';
import { AccountManagementComponent } from './pages/admin/account-management/account-management';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'account-plan', component: AccountPlanComponent },
      { path: 'admin/users', component: UserManagementComponent },
      { path: 'admin/accounts', component: AccountManagementComponent }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
