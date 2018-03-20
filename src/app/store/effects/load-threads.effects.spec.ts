import { TestBed, inject } from '@angular/core/testing';

import { LoadThreadsEffect} from './load-threads.effects';

describe('LoadThreadsEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadThreadsEffect]
    });
  });

  it('should be created', inject([LoadThreadsEffect], (service: LoadThreadsEffect) => {
    expect(service).toBeTruthy();
  }));
});
