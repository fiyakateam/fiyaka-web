import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import PlaceholderImage from '../../constant/placeholder_image';
import { Tenant } from '../../model/tenant.model';
import { TenantService } from '../../service/tenant.service';

@Component({
  selector: 'app-tenants-dropdown',
  templateUrl: './tenants-dropdown.component.html',
  styleUrls: ['./tenants-dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TenantsDropdownComponent),
      multi: true,
    },
  ],
})
export class TenantsDropdownComponent implements OnInit, ControlValueAccessor {
  tenantList: Tenant[] = [];
  value: Tenant;

  onChange: any = () => {};
  onTouch: any = () => {};

  set setValue(value: Tenant) {
    if (value) {
      this.value = value;
      this.onChange(value);
      this.onTouch(value);
    }
  }

  onInputChange(input: Tenant): void {
    this.onChange(input);
  }

  constructor(private tenantService: TenantService) {}

  ngOnInit(): void {
    this.refresh();
  }

  setSelected(brochure: Tenant): void {
    this.tenantService.getTenantList().subscribe((res) => {
      const mapped = res.map((e) => {
        const domain: Tenant = {
          id: e.id,
          email: e.email,
          description: e.description,
          name: e.name,
          bannerImageUrl: PlaceholderImage.banner,
          avatarImageUrl: PlaceholderImage.avatar,
        };
        return domain;
      });
      this.tenantList = mapped;
      const found = this.tenantList.find((item) => item.id === brochure.id);
      this.setValue = found;
    });
  }

  refresh(): void {
    this.tenantService.getTenantList().subscribe((res) => {
      const mapped = res.map((e) => {
        const domain: Tenant = {
          id: e.id,
          email: e.email,
          description: e.description,
          name: e.name,
          bannerImageUrl: PlaceholderImage.banner,
          avatarImageUrl: PlaceholderImage.avatar,
        };
        return domain;
      });
      this.tenantList = mapped;
    });
  }

  writeValue(obj: any): void {
    this.setValue = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
