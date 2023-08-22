import { TestBed } from '@angular/core/testing';

import { ChatListPresenterService } from './chat-list-presenter.service';

describe('ChatListPresenterService', () => {
  let service: ChatListPresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatListPresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
