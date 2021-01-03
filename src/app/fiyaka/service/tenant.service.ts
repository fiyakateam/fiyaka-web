import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/config/api-path';
import { TenantResponse } from '../model/api/fiyaka_api';
import { Tenant } from '../model/tenant.model';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  constructor(private http: HttpClient) {}

  getTenantList(): Observable<Array<TenantResponse>> {
    return this.http.get<Array<TenantResponse>>(ApiPath.tenant);
  }

  getTenant(id: string): Observable<TenantResponse> {
    return this.http.get<TenantResponse>(ApiPath.tenantId(id));
  }

  deleteTenant(id: string): Observable<void> {
    return this.http.delete<void>(ApiPath.tenantId(id));
  }

  createTenant(tenant: Tenant): Observable<TenantResponse> {
    const request = {
      email: tenant.email,
      name: tenant.name,
    };
    return this.http.post<TenantResponse>(ApiPath.tenant, request);
  }

  updateTenant(id: string, tenant: Tenant): Observable<TenantResponse> {
    const request = {
      name: tenant.name,
    };
    return this.http.put<TenantResponse>(ApiPath.tenantId(id), request);
  }
}
