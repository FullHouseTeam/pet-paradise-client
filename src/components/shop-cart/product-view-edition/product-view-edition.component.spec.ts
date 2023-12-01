import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductViewEditionComponent } from './product-view-edition.component';

describe('ProductViewEditionComponent', () => {
  let component: ProductViewEditionComponent;
  let fixture: ComponentFixture<ProductViewEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductViewEditionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductViewEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
