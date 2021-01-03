import { Component, Input, OnInit } from '@angular/core';
import { Tenant } from '../../model/tenant.model';

@Component({
  selector: 'app-tenant-card',
  templateUrl: './tenant-card.component.html',
  styleUrls: ['./tenant-card.component.css'],
})
export class TenantCardComponent implements OnInit {
  @Input() tenant: Tenant;

  constructor() {}

  ngOnInit(): void {}
}
