import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDebugComponent } from './chat-debug.component';

describe('ChatDebugComponent', () => {
  let component: ChatDebugComponent;
  let fixture: ComponentFixture<ChatDebugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatDebugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
