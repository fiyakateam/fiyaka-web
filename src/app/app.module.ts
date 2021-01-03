import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LoginComponent } from './auth/view/login/login.component';
import { LogoutComponent } from './auth/view/logout/logout.component';
import { RegisterComponent } from './auth/view/register/register.component';
import { LandingComponent } from './core/view/landing/landing.component';
import { NotFoundComponent } from './core/view/not-found/not-found.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { LoadingComponent } from './core/view/loading/loading.component';
import { LoadingHttpInterceptor } from './core/middleware/loading-http.interceptor';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TenantsComponent } from './fiyaka/view/tenants/tenants.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { TenantCardComponent } from './fiyaka/view/tenant-card/tenant-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { TextInputComponent } from './core/view/input/text-input/text-input.component';
import { TenantFormComponent } from './fiyaka/view/tenant-form/tenant-form.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    LandingComponent,
    NotFoundComponent,
    LoadingComponent,
    TenantsComponent,
    TenantCardComponent,
    TextInputComponent,
    TenantFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzMessageModule,
    NzGridModule,
    NzDividerModule,
    NzCardModule,
    NzAvatarModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
