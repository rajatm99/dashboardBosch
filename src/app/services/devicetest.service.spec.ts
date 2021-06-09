import { TestBed } from '@angular/core/testing';

import { DevicetestService } from './devicetest.service';

describe('DevicetestService', () => {
  let service: DevicetestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevicetestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
 