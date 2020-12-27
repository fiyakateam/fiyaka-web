import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fiyaka-webapp';
  version = 'v0.1';
  isCollapsed = false;
  authLink = '/login';
  authLabel = 'Login';
}
