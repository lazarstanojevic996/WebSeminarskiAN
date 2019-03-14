import { TestBed } from '@angular/core/testing';

import { ZadatakService } from './zadatak.service';

describe('ZadatakService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZadatakService = TestBed.get(ZadatakService);
    expect(service).toBeTruthy();
  });
});
