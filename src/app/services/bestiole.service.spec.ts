import { TestBed } from '@angular/core/testing';

import { BestioleService } from './bestiole.service';

describe('BestioleService', () => {
  let service: BestioleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BestioleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
