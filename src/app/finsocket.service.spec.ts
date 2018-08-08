import { TestBed, inject } from '@angular/core/testing';

import { FinsocketService } from './finsocket.service';

describe('FinsocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinsocketService]
    });
  });

  it('should be created', inject([FinsocketService], (service: FinsocketService) => {
    expect(service).toBeTruthy();
  }));
});
