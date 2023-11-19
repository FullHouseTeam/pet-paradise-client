import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesAndProductsComponent } from './categories-and-products.component';

describe('CategoriesAndProductsComponent', () => {
  let component: CategoriesAndProductsComponent;
  let fixture: ComponentFixture<CategoriesAndProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesAndProductsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesAndProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
