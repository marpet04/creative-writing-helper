import { TestBed } from '@angular/core/testing';

import { StoryCharacterService } from './story-character-service.service';

describe('StoryCharacterService', () => {
  let service: StoryCharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoryCharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
