import { TestBed } from '@angular/core/testing';

import { EodPresenterService } from './eod-presenter.service';

describe('EodPresenterService', () => {
  let service: EodPresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EodPresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
