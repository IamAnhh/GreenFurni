import { TestBed } from '@angular/core/testing';

import { CustomproductService } from './customproduct.service';

describe('CustomproductService', () => {
  let service: CustomproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
