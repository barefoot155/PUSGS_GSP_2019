import { TestBed } from '@angular/core/testing';

import { UploadFileServiceService } from './upload-file-service.service';

describe('UploadFileServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadFileServiceService = TestBed.get(UploadFileServiceService);
    expect(service).toBeTruthy();
  });
});
