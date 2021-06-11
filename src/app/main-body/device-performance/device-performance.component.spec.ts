import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicePerformanceComponent } from './device-performance.component';

describe('DevicePerformanceComponent', () => {
  let component: DevicePerformanceComponent;
  let fixture: ComponentFixture<DevicePerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicePerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
