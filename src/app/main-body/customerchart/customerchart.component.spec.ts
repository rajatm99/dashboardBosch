import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerchartComponent } from './customerchart.component';

describe('CustomerchartComponent', () => {
  let component: CustomerchartComponent;
  let fixture: ComponentFixture<CustomerchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
