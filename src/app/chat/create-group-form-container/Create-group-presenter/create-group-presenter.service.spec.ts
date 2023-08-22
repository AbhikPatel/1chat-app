import { TestBed } from '@angular/core/testing';

import { CreateGroupPresenterService } from './create-group-presenter.service';

describe('CreateGroupPresenterService', () => {
  let service: CreateGroupPresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateGroupPresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
