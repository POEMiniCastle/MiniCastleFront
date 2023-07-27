import { TestBed } from '@angular/core/testing';

import { ServiceToDeleteService } from './service-to-delete.service';

describe('ServiceToDeleteService', () => {
  let service: ServiceToDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceToDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
