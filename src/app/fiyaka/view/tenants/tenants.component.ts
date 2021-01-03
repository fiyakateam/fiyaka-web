import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css'],
})
export class TenantsComponent implements OnInit {
  tenantList = [];

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.tenantList.push(12);
    }
  }
}
