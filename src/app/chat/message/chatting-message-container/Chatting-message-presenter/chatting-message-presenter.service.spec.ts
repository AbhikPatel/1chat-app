import { TestBed } from '@angular/core/testing';

import { ChattingMessagePresenterService } from './chatting-message-presenter.service';

describe('ChattingMessagePresenterService', () => {
  let service: ChattingMessagePresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChattingMessagePresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
