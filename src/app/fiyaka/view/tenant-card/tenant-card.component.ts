import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Tenant } from '../../model/tenant.model';
import { TenantService } from '../../service/tenant.service';

@Component({
  selector: 'app-tenant-card',
  templateUrl: './tenant-card.component.html',
  styleUrls: ['./tenant-card.component.css'],
})
export class TenantCardComponent implements OnInit {
  @Input() createPlaceholder: boolean;
  @Input() tenant: Tenant;
  @Output() createClick = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();

  constructor(
    private tenantService: TenantService,
    private notification: NotificationService
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
}
