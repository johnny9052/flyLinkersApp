import { TestBed } from '@angular/core/testing';

import { First100Service } from './first100.service';

describe('First100Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: First100Service = TestBed.get(First100Service);
    expect(service).toBeTruthy();
  });
});
