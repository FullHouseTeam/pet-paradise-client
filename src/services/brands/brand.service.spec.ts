import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrandService } from './brand.service';

describe('BrandService', () => {
  let service: BrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(BrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
