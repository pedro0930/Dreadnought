import { TestBed } from '@angular/core/testing';

import { FleetService } from './fleet.service';

describe('FleetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FleetService = TestBed.get(FleetService);
    expect(service).toBeTruthy();
  });
});
