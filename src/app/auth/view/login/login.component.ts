import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin = true;

  loginEmail = '';
  loginPassword = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  switchToLogin(): void {
    if (this.isLogin) { return; }
    this.isLogin = true;
  }

  switchToRegister(): void {
    if (!this.isLogin) { return; }
    this.isLogin = false;
  }

  onLogin(): void {
    console.warn('hello');
    this.auth.login(this.loginEmail, this.loginPassword).subscribe((res) => {
      console.log(res);
    });
  }

  onRegister(): void {

  }

}
