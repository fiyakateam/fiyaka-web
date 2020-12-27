import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './view/landing/landing.component';
import { NotFoundComponent } from './view/not-found/not-found.component';



@NgModule({
  declarations: [LandingComponent, NotFoundComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
