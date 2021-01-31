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
  occupant: DumpTenantResponse;
}

export interface DumpTenantResponse {
  _id: string;
  name: string;
  email: string;
  landlord: string;
  description: string;
}

export interface ConversationModel {
  _id: string;
  landlord: string;
  tenant: string;
  messages: Array<MessageModel>;
}

export interface MessageModel {
  _id: string;
  content: string;
  to: string;
  from: string;
  date: string;
}
