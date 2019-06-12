import { TestBed } from '@angular/core/testing';

import { RealTimeServiceService } from './real-time-service.service';

describe('RealTimeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RealTimeServiceService = TestBed.get(RealTimeServiceService);
    expect(service).toBeTruthy();
  });
});
