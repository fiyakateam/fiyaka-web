export interface TenantResponse {
  id: string;
  name: string;
  email: string;
  landlord: string;
  description: string;
}

export interface TenantResponseWithPassword {
  tenant: TenantResponse;
  password: string;
}

export interface HouseResponse {
  _id: string;
  name: string;
  address: string;
  _owner: string;
}
