import { TestBed } from '@angular/core/testing';

import { PricelistServiceService } from './pricelist-service.service';

describe('PricelistServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PricelistServiceService = TestBed.get(PricelistServiceService);
    expect(service).toBeTruthy();
  });
});
