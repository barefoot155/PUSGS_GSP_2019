import { TestBed } from '@angular/core/testing';

import { LineServiceService } from './line-service.service';

describe('LineServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LineServiceService = TestBed.get(LineServiceService);
    expect(service).toBeTruthy();
  });
});
