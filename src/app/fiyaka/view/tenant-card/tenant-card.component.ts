import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Tenant } from '../../model/tenant.model';
import { ChatService } from '../../service/chat.service';
import { TenantService } from '../../service/tenant.service';
import { EmailFormComponent } from '../email-form/email-form.component';

@Component({
  selector: 'app-tenant-card',
  templateUrl: './tenant-card.component.html',
  styleUrls: ['./tenant-card.component.css'],
})
export class TenantCardComponent implements OnInit {
  @Input() createPlaceholder: boolean;
  @Input() tenant: Tenant;
  @Output() createClick = new EventEmitter<void>();
  @Output() updateClick = new EventEmitter<Tenant>();
  @Output() deleted = new EventEmitter<void>();
  modalVisible = false;
  @ViewChild('emailForm') emailForm: EmailFormComponent;

  constructor(
    private tenantService: TenantService,
    private notification: NotificationService,
    private chatService: ChatService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onCreateClick(): void {
    this.createClick.emit();
  }

  onDelete(): void {
    this.tenantService.deleteTenant(this.tenant.id).subscribe(
      (res) => {
        this.notification.pushSuccess(`Deleted tenant ${this.tenant.name}`);
        this.deleted.emit();
      },
      (err) => {
        console.error(err);
        this.notification.pushError(
          `Could not delete tenant ${this.tenant.name}`
        );
      }
    );
  }

  onUpdateClick(): void {
    this.updateClick.emit(this.tenant);
  }

  onChatClick(): void {
    this.chatService.currentTenant = this.tenant;
    console.log(`Chat click: ${this.tenant}`);
    this.router.navigate(['/chat-tenant']);
  }

  showModal(): void {
    this.modalVisible = true;
  }

  hideModal(): void {
    this.modalVisible = false;
    this.emailForm.onReset();
  }

  onEmail(): void {
    this.emailForm.setTenant(this.tenant);
    this.showModal();
  }

  getDescriptionBox(): string {
    return `${this.tenant.email} - ${this.tenant.description}`;
  }
}
