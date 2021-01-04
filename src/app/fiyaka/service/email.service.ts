import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/config/api-path';
import { Tenant } from '../model/tenant.model';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendGeneratedPasswordWithEmail(
    password: string,
    tenant: Tenant
  ): Observable<void> {
    const request = {
      to: `${tenant.email}`,
      subject: 'Your account on Fiyaka has beed created!',
      text: `Your account on Fiyaka has beed created!\nIn order to login to system, download our mobile app and login with provided credentials.\nEmail: ${tenant.email}\nPassword: ${password}\nThis email is automated, do not reply.\n\nSincerely, Fiyaka Team`,
    };
    return this.http.post<void>(ApiPath.landlordEmail, request);
  }

  sendEmail(tenant: Tenant, subject: string, text: string): Observable<void> {
    const request = {
      to: tenant.email,
      subject,
      text,
    };
    return this.http.post<void>(ApiPath.landlordEmail, request);
  }
}
