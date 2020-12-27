import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/view/login/login.component';
import { LogoutComponent } from './auth/view/logout/logout.component';
import { RegisterComponent } from './auth/view/register/register.component';
import { LandingComponent } from './core/view/landing/landing.component';
import { NotFoundComponent } from './core/view/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
