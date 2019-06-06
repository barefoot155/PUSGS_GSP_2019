import { TestBed } from '@angular/core/testing';

import { TicketsServiceService } from './tickets-service.service';

describe('TicketsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TicketsServiceService = TestBed.get(TicketsServiceService);
    expect(service).toBeTruthy();
  });
});
