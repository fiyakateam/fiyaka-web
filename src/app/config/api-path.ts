export class ApiPath {
  private static readonly root: string = 'https://fiyakaapi.herokuapp.com';
  private static readonly api: string = `${ApiPath.root}`;

  public static readonly auth: string = `${ApiPath.api}/auth`;
  public static readonly login: string = `${ApiPath.auth}/login`;
  public static readonly register: string = `${ApiPath.auth}/register`;

  public static readonly tenant: string = `${ApiPath.api}/tenant`;

  public static readonly landlord: string = `${ApiPath.api}/landlord`;
  public static readonly landlordEmail: string = `${ApiPath.landlord}/email`;

  public static readonly house: string = `${ApiPath.api}/house`;

  public static tenantId(id: string): string {
    return `${ApiPath.tenant}/${id}`;
  }

  public static houseId(id: string): string {
    return `${ApiPath.house}/${id}`;
  }

  public static houseTenantPatch(id: string): string {
    return `${ApiPath.houseId(id)}/tenant`;
  }
}
