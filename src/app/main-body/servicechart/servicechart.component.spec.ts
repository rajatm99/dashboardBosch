import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicechartComponent } from './servicechart.component';

describe('ServicechartComponent', () => {
  let component: ServicechartComponent;
  let fixture: ComponentFixture<ServicechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
