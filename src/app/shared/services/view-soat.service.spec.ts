import { TestBed, inject } from '@angular/core/testing';

import { ViewSoatService } from './view-soat.service';

describe('ViewSoatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewSoatService]
    });
  });

  it('should be created', inject([ViewSoatService], (service: ViewSoatService) => {
    expect(service).toBeTruthy();
  }));
});
