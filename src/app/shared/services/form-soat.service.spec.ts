import { TestBed, inject } from '@angular/core/testing';

import { FormSoatService } from './form-soat.service';

describe('FormSoatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormSoatService]
    });
  });

  it('should be created', inject([FormSoatService], (service: FormSoatService) => {
    expect(service).toBeTruthy();
  }));
});
