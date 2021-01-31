import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTenantComponent } from './chat-tenant.component';

describe('ChatTenantComponent', () => {
  let component: ChatTenantComponent;
  let fixture: ComponentFixture<ChatTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
