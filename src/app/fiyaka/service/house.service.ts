import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/config/api-path';
import { HouseResponse } from '../model/api/fiyaka_api';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  constructor(private http: HttpClient) {}

  getHouseList(): Observable<Array<HouseResponse>> {
    return this.http.get<Array<HouseResponse>>(ApiPath.house);
  }

  getHouse(id: string): Observable<HouseResponse> {
    return this.http.get<HouseResponse>(ApiPath.houseId(id));
  }

  deleteHouse(id: string): Observable<void> {
    return this.http.delete<void>(ApiPath.houseId(id));
  }

  createHouse(house: HouseResponse): Observable<HouseResponse> {
    const request = {
      address: house.address,
      name: house.name,
    };
    return this.http.post<HouseResponse>(ApiPath.house, request);
  }

  updateHouse(id: string, house: HouseResponse): Observable<HouseResponse> {
    const request = {
      address: house.address,
      name: house.name,
    };
    return this.http.put<HouseResponse>(ApiPath.houseId(id), request);
  }

  assignTenantToHouse(houseId: string, tenantId: string): Observable<void> {
    const request = {
      _occupant: tenantId,
    };
    return this.http.patch<void>(ApiPath.houseTenantPatch(houseId), request);
  }
}
