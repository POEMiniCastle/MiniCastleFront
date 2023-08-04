import { TestBed } from '@angular/core/testing';

import { InsertCardService } from './insert-card.service';

describe('InsertCardService', () => {
  let service: InsertCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
