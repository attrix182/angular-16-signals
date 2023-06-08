import { TestBed } from '@angular/core/testing';

import { SignalTasksService } from './signal-tasks.service';

describe('SignalTasksService', () => {
  let service: SignalTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
