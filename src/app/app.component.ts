import { Component, OnInit } from '@angular/core';
import { AuthResult } from './auth/model/auth-result';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'fiyaka-webapp';
  version = 'v0.1';
  isCollapsed = false;
  isReverseArrow = false;
  width = 200;
  authLink = '/login';
  authLabel = 'Login';
  username = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    console.log('App Component init Call');
    const authResult = this.auth.authStatus();
    this.refreshItems(authResult);
    this.auth.authStateChange.subscribe((authStatus) => {
      this.refreshItems(authStatus);
    });
  }

  private refreshItems(authStatus: AuthResult): void {
    this.authLabel = 'Login';
    this.authLink = '/login';
    this.username = '';
    if (authStatus.success) {
      this.authLabel = 'Logout';
      this.authLink = '/logout';
      this.username = authStatus.user.username;
    }
  }
}
