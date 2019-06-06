import { TestBed } from '@angular/core/testing';

import { PasswordChangeServiceService } from './password-change-service.service';

describe('PasswordChangeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordChangeServiceService = TestBed.get(PasswordChangeServiceService);
    expect(service).toBeTruthy();
  });
});
