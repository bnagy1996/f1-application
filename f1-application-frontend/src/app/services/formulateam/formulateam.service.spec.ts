import { TestBed } from '@angular/core/testing';

import { FormulateamService } from './formulateam.service';

describe('FormulateamService', () => {
  let service: FormulateamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulateamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
