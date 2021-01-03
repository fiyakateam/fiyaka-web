import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Tenant } from '../../model/tenant.model';
import { TenantService } from '../../service/tenant.service';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.css'],
})
export class TenantFormComponent {
  tenantForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    description: [null, Validators.required],
  });
  @Output() doneSubmit = new EventEmitter<Tenant>();

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private tenantService: TenantService
  ) {}

  onSubmit(): void {
    const formValue = this.tenantForm.value;
    const email = formValue.email;
    const name = formValue.name;
    const description = formValue.description;
    const tenant: Tenant = {
      name,
      email,
      description,
      avatarImageUrl: '',
      bannerImageUrl: '',
    };
    this.tenantService.createTenant(tenant).subscribe(
      (res) => {
        this.notificationService.pushSuccess(`New tenant created: ${res.name}`);
        const domain: Tenant = {
          name: res.name,
          avatarImageUrl: '',
          bannerImageUrl: '',
          description: res.description,
          email: res.email,
        };
        this.doneSubmit.emit(domain);
      },
      (err) => {
        console.error(err);
        this.notificationService.pushError('Tenant creation failed');
      }
    );
  }

  isValid(): boolean {
    return this.tenantForm.valid;
  }
}
