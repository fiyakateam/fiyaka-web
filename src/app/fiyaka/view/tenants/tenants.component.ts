import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Tenant } from '../../model/tenant.model';
import { TenantService } from '../../service/tenant.service';
import { TenantFormComponent } from '../tenant-form/tenant-form.component';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css'],
})
export class TenantsComponent implements OnInit {
  @ViewChild('tenantForm') tenantForm: TenantFormComponent;
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

  showModalWithData(tenant: Tenant): void {
    this.tenantForm.populateWithTenant(tenant);
    this.modalVisible = true;
  }

  hideModal(): void {
    this.modalVisible = false;
    this.tenantForm.onReset();
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
