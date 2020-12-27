export class ApiPath {
    private static readonly root: string = 'https://fiyakaapi.herokuapp.com';
    private static readonly api: string = `${ApiPath.root}`;

    public static readonly auth: string = `${ApiPath.api}/auth`;
    public static readonly login: string = `${ApiPath.auth}/login`;
}
