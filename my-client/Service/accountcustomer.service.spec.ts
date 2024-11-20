import { TestBed } from '@angular/core/testing';

import { AccountcustomerService } from './accountcustomer.service';

describe('AccountcustomerService', () => {
  let service: AccountcustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountcustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
