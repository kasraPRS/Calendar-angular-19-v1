import {TestBed} from '@angular/core/testing';

import {CalendarDateAssignmentService} from './calendar-date-assignment.service';

describe('CalendarDateAssignmentService', () => {
  let service: CalendarDateAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarDateAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
