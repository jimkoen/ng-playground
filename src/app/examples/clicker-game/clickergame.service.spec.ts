import { TestBed } from '@angular/core/testing';

import { ClickergameService } from './clickergame.service';

describe('ClickergameService', () => {
  let service: ClickergameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickergameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
