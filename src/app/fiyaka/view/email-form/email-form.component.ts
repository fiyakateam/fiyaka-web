import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Tenant } from '../../model/tenant.model';
import { EmailService } from '../../service/email.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent {
  emailForm = this.fb.group({
    subject: ['', Validators.required],
    text: ['', Validators.required],
  });
  @Output() doneSubmit = new EventEmitter<void>();
  tenant: Tenant;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private emailService: EmailService
  ) {}

  setTenant(tenant: Tenant): void {
    this.tenant = tenant;
  }

  onSubmit(): void {
    const formValue = this.emailForm.value;
    const subject = formValue.subject;
    const text = formValue.text;

    this.emailService.sendEmail(this.tenant, subject, text).subscribe(
      (res) => {
        this.notificationService.pushSuccess(`Sent email`);
        this.onDone();
      },
      (err) => {
        console.error(err);
        this.notificationService.pushSuccess(`Could not send the email`);
      }
    );
  }

  onDone(): void {
    this.onReset();
    this.doneSubmit.emit();
  }

  onReset(): void {
    this.emailForm.reset();
    this.tenant = null;
  }

  isValid(): boolean {
    return this.emailForm.valid;
  }
}
