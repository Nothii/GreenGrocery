import { TestBed } from '@angular/core/testing';

import { FruitService } from './frutis.service';

describe('FruitService', () => {
  let service: FruitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FruitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
