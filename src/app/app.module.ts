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
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AuthInterceptor } from './auth/middleware/auth.interceptor';
import { UnauthorizedComponent } from './auth/view/unauthorized/unauthorized.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    LandingComponent,
    NotFoundComponent,
    LoadingComponent,
    TenantsComponent,
    TenantCardComponent,
    TextInputComponent,
    TenantFormComponent,
    UnauthorizedComponent,
    LoadingComponent,
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
    NzModalModule,
    NzBreadCrumbModule,
    NzDropDownModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
