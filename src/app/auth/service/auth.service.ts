import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ApiPath } from 'src/app/config/api-path';
import { LocalStorage } from 'src/app/config/local-storage';
import { AuthResult } from '../model/auth-result';
import { User } from '../model/user';
import * as jwt from '../util/jwt-util';
import { map, shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public redirectUrl: string;
  public authStateChange = new Subject<AuthResult>();

  constructor(private http: HttpClient, private router: Router) {}

  public login(email: string, password: string): Observable<AuthResult> {
    const request = {
      email,
      password
    };
    return this.http
      .post<{access_token: string}>(ApiPath.login, request, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<{access_token: string}>) => {
          const success = response.ok;
          if (success) {
            const token = response.body.access_token;
            const user = new User(email, token);
            return new AuthResult(true, user);
          }

          return new AuthResult(false);
        }),
        tap((response: AuthResult) => {
          const success = response.success;
          if (success) {
            this.setSession(response);
          }
          if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
          } else {
            this.router.navigate(['/landing']);
          }
          this.authStateChange.next(response);
        }),
        shareReplay()
      );
  }

  public logout(): void {
    localStorage.removeItem(LocalStorage.token);
    localStorage.removeItem(LocalStorage.username);
    this.router.navigate(['/landing']);
    this.authStateChange.next(new AuthResult(false, null));
  }

  public authStatus(): AuthResult {
    const token = localStorage.getItem(LocalStorage.token);
    const username = localStorage.getItem(LocalStorage.username);
    if (!token) {
      return new AuthResult(false, null);
    }
    const expired = jwt.isExpired(token);
    if (expired) {
      return new AuthResult(false, null);
    }
    return new AuthResult(true, new User(username, token));
  }

  private setSession(authResult: AuthResult): void {
    if (!authResult.success) {
      return;
    }

    localStorage.setItem(LocalStorage.token, authResult.user.token);
    localStorage.setItem(LocalStorage.username, authResult.user.username);
  }
}
