import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin = true;


  constructor() { }

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

}
