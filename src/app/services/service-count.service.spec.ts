import { TestBed } from '@angular/core/testing';

import { ServiceCountService } from './service-count.service';

describe('ServiceCountService', () => {
  let service: ServiceCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
