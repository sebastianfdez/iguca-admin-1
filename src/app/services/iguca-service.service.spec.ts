import { TestBed, inject } from '@angular/core/testing';

import { IgucaService } from './iguca-service.service';

describe('IgucaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IgucaService]
    });
  });

  it('should be created', inject([IgucaService], (service: IgucaService) => {
    expect(service).toBeTruthy();
  }));
});
