import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCustomerComponent } from './device-customer.component';

describe('DeviceCustomerComponent', () => {
  let component: DeviceCustomerComponent;
  let fixture: ComponentFixture<DeviceCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
