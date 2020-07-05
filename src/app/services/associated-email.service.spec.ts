import { TestBed } from '@angular/core/testing';

import { AssociatedEmailService } from './associated-email.service';

describe('AssociatedEmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssociatedEmailService = TestBed.get(AssociatedEmailService);
    expect(service).toBeTruthy();
  });
});
