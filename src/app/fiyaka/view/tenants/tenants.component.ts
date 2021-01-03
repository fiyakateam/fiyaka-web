import { Component, OnInit } from '@angular/core';
import { Tenant } from '../../model/tenant.model';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css'],
})
export class TenantsComponent implements OnInit {
  modalVisible = false;
  tenantList: Array<Tenant> = [];

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.tenantList.push({
        email: 'tenant@gmail.com',
        name: 'Tenant Name',
        description: 'Tenant Description...',
        avatarImageUrl:
          'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        bannerImageUrl:
          'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      });
    }
  }

  showModal(): void {
    this.modalVisible = true;
  }

  hideModal(): void {
    this.modalVisible = false;
  }
}
