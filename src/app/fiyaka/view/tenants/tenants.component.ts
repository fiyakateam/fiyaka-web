import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Tenant } from '../../model/tenant.model';
import { TenantService } from '../../service/tenant.service';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css'],
})
export class TenantsComponent implements OnInit {
  modalVisible = false;
  tenantList: Array<Tenant> = [];

  constructor(
    private tenantService: TenantService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.refreshTenantList();
  }

  showModal(): void {
    this.modalVisible = true;
  }

  hideModal(): void {
    this.modalVisible = false;
    this.refreshTenantList();
  }

  refreshTenantList(): void {
    this.tenantService.getTenantList().subscribe(
      (res) => {
        this.tenantList = res.map((e) => {
          const domain: Tenant = {
            id: e.id,
            email: e.email,
            name: e.name,
            avatarImageUrl: '',
            bannerImageUrl: '',
            description: e.description,
          };
          return domain;
        });
        this.notificationService.pushSuccess('Tenant list refreshed!');
      },
      (error) => {
        console.error(error);
        this.notificationService.pushError('Could not get tenant list!');
      }
    );
  }
}
