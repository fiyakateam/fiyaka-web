import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Tenant } from '../../model/tenant.model';
import { EmailService } from '../../service/email.service';
import { TenantService } from '../../service/tenant.service';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.css'],
})
export class TenantFormComponent implements OnInit {
  tenantForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    description: [null, Validators.required],
  });
  @Output() doneSubmit = new EventEmitter<Tenant>();

  isPopulated = false;
  populatedId: string;
  isForm = true;
  createdTenant: Tenant;
  generatedPassword: string;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private tenantService: TenantService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {}

  public populateWithTenant(tenant: Tenant): void {
    this.tenantForm.setValue({
      name: tenant.name,
      email: tenant.email,
      description: 'description foo',
    });
    this.isPopulated = true;
    this.populatedId = tenant.id;
  }

  onSubmit(): void {
    const formValue = this.tenantForm.value;
    const email = formValue.email;
    const name = formValue.name;
    const description = formValue.description;
    const tenant: Tenant = {
      id: null,
      name,
      email,
      description,
      avatarImageUrl: '',
      bannerImageUrl: '',
    };
    if (this.isPopulated) {
      const id = this.populatedId;
      this.tenantService.updateTenant(id, tenant).subscribe(
        (res) => {
          this.notificationService.pushSuccess(`Tenant updated`);
          this.onDone();
        },
        (err) => {
          console.error(err);
          this.notificationService.pushSuccess(`Tenant update failed`);
        }
      );
    } else {
      this.tenantService.createTenant(tenant).subscribe(
        (res) => {
          const resTenant = res.tenant;
          const resPasssword = res.password;
          this.notificationService.pushSuccess(
            `New tenant created: ${resTenant.name}`
          );
          const domain: Tenant = {
            id: resTenant.id,
            name: resTenant.name,
            avatarImageUrl: '',
            bannerImageUrl: '',
            description: resTenant.description,
            email: resTenant.email,
          };
          this.generatedPassword = resPasssword;
          this.createdTenant = domain;
          this.isForm = false;
        },
        (err) => {
          console.error(err);
          this.notificationService.pushError('Tenant creation failed');
        }
      );
    }
  }

  isValid(): boolean {
    return this.tenantForm.valid;
  }

  onEmailSend(): void {
    this.emailService
      .sendGeneratedPasswordWithEmail(
        this.generatedPassword,
        this.createdTenant
      )
      .subscribe(
        (res) => {
          this.notificationService.pushSuccess('Sent credentials with email');
          this.onDone();
        },
        (err) => {
          console.error(err);
          this.notificationService.pushSuccess(
            'Could not send credentials with email'
          );
        }
      );
  }

  onNoEmailSend(): void {
    this.onDone();
  }

  onDone(): void {
    this.onReset();
    this.doneSubmit.emit(this.createdTenant);
  }

  onReset(): void {
    this.tenantForm.reset();
    this.isForm = true;
    this.createdTenant = null;
    this.generatedPassword = null;
    this.isPopulated = false;
    this.populatedId = null;
  }
}
