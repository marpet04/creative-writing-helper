import { TestBed } from '@angular/core/testing';

import { GalleryService } from './gallery.service';

describe('GalleryServiceService', () => {
  let service: GalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
