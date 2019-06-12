import { TestBed } from '@angular/core/testing';

import { ClickServiceService } from './click-service.service';

describe('ClickServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClickServiceService = TestBed.get(ClickServiceService);
    expect(service).toBeTruthy();
  });
});
