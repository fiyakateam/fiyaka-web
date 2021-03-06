import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/service/notification.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogin = true;

  loginEmail = '';
  loginPassword = '';

  registerEmail = '';
  registerName = '';
  registerPassword = '';

  constructor(
    private auth: AuthService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {}

  switchToLogin(): void {
    if (this.isLogin) {
      return;
    }
    this.isLogin = true;
  }

  switchToRegister(): void {
    if (!this.isLogin) {
      return;
    }
    this.isLogin = false;
  }

  onLogin(): void {
    this.auth.login(this.loginEmail, this.loginPassword).subscribe(
      (res) => {
        this.notification.pushSuccess(`Logged in as ${res.user.username}`);
      },
      (err) => {
        console.error(err);
        this.notification.pushError('Login failed');
      }
    );
  }

  onRegister(): void {
    this.auth
      .register(this.registerName, this.registerEmail, this.registerPassword)
      .subscribe(
        (res) => {
          this.notification.pushSuccess(`Registerd as ${res.user.username}`);
        },
        (err) => {
          console.error(err);
          this.notification.pushError('Register failed');
        }
      );
  }
}
