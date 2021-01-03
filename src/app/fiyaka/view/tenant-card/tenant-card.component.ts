import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tenant } from '../../model/tenant.model';

@Component({
  selector: 'app-tenant-card',
  templateUrl: './tenant-card.component.html',
  styleUrls: ['./tenant-card.component.css'],
})
export class TenantCardComponent implements OnInit {
  @Input() createPlaceholder: boolean;
  @Input() tenant: Tenant;
  @Output() createClick = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onCreateClick(): void {
    this.createClick.emit();
  }
}
