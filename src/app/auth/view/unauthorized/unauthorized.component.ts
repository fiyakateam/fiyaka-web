import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css'],
})
export class UnauthorizedComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  getRequestedUrlName(): string {
    return this.auth.redirectUrl;
  }
}
