import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './view/logout/logout.component';
import { LoginComponent } from './view/login/login.component';
import { RegisterComponent } from './view/register/register.component';



@NgModule({
  declarations: [LogoutComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
