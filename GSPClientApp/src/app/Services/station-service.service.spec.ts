import { TestBed } from '@angular/core/testing';

import { StationServiceService } from './station-service.service';

describe('StationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StationServiceService = TestBed.get(StationServiceService);
    expect(service).toBeTruthy();
  });
});
