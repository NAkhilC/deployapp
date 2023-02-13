import { TestBed } from '@angular/core/testing';

import { RefHttpService } from './ref-http.service';

describe('RefHttpService', () => {
  let service: RefHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
