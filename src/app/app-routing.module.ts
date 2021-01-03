import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/middleware/auth.guard';
import { NonAuthGuard } from './auth/middleware/non-auth.guard';
import { LoginComponent } from './auth/view/login/login.component';
import { LogoutComponent } from './auth/view/logout/logout.component';
import { RegisterComponent } from './auth/view/register/register.component';
import { UnauthorizedComponent } from './auth/view/unauthorized/unauthorized.component';
import { LandingComponent } from './core/view/landing/landing.component';
import { NotFoundComponent } from './core/view/not-found/not-found.component';
import { TenantsComponent } from './fiyaka/view/tenants/tenants.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    canActivate: [NonAuthGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [NonAuthGuard] },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonAuthGuard],
  },
  { path: 'tenants', component: TenantsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
