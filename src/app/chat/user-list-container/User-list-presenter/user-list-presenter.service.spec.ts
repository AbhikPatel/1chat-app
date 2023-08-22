import { TestBed } from '@angular/core/testing';

import { UserListPresenterService } from './user-list-presenter.service';

describe('UserListPresenterService', () => {
  let service: UserListPresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserListPresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
