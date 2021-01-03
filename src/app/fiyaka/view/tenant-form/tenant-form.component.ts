import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Tenant } from '../../model/tenant.model';

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
  @Output() doneSubmit = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService
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
    console.warn(tenant);
    this.doneSubmit.emit();
  }

  isValid(): boolean {
    return this.tenantForm.valid;
  }
}
