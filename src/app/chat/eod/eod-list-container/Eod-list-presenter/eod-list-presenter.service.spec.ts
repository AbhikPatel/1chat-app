import { TestBed } from '@angular/core/testing';

import { EodListPresenterService } from './eod-list-presenter.service';

describe('EodListPresenterService', () => {
  let service: EodListPresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EodListPresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
