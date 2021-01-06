import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantsDropdownComponent } from './tenants-dropdown.component';

describe('TenantsDropdownComponent', () => {
  let component: TenantsDropdownComponent;
  let fixture: ComponentFixture<TenantsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantsDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
