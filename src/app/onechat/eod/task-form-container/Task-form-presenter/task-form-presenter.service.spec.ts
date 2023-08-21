import { TestBed } from '@angular/core/testing';

import { TaskFormPresenterService } from './task-form-presenter.service';

describe('TaskFormPresenterService', () => {
  let service: TaskFormPresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskFormPresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
