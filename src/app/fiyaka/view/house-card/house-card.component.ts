import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NotificationService } from 'src/app/core/service/notification.service';
import { HouseResponse } from '../../model/api/fiyaka_api';
import { Tenant } from '../../model/tenant.model';
import { HouseService } from '../../service/house.service';
import { TenantsDropdownComponent } from '../tenants-dropdown/tenants-dropdown.component';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.css'],
})
export class HouseCardComponent implements OnInit {
  @Input() createPlaceholder: boolean;
  @Input() house: HouseResponse;
  @Output() createClick = new EventEmitter<void>();
  @Output() updateClick = new EventEmitter<HouseResponse>();
  @Output() deleted = new EventEmitter<void>();

  constructor(
    private tenantService: HouseService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    console.warn(this.house);
  }

  onCreateClick(): void {
    this.createClick.emit();
  }

  onDelete(): void {
    this.tenantService.deleteHouse(this.house._id).subscribe(
      (res) => {
        this.notification.pushSuccess(`Deleted tenant ${this.house.name}`);
        this.deleted.emit();
      },
      (err) => {
        console.error(err);
        this.notification.pushError(
          `Could not delete tenant ${this.house.name}`
        );
      }
    );
  }

  onUpdateClick(): void {
    this.updateClick.emit(this.house);
  }

  getDescription(): string {
    return `${this.house?.occupant?.email ?? 'No Tenant Assigned'} - ${
      this.house.address
    }`;
  }
}
