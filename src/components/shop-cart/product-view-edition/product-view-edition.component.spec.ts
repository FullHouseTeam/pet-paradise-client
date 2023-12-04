import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductViewEditionComponent } from './product-view-edition.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PurchaseService } from '../../../services/purchases/purchase.service';
import { ProductService } from '../../../services/products/product.service';
import { of } from 'rxjs';

describe('ProductViewEditionComponent', () => {
  let component: ProductViewEditionComponent;
  let fixture: ComponentFixture<ProductViewEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductViewEditionComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: PurchaseService, useValue: jasmine.createSpyObj('PurchaseService', ['getById', 'update']) },
        { provide: ProductService, useValue: jasmine.createSpyObj('ProductService', ['getById']) },
      ],
    }).compileComponents();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set product properties on ngOnInit', () => {
    const productService = TestBed.inject(ProductService);
    const mockProduct = { productID: 2, name: 'doggy toy', price: 30, quantity: 10, image: 'https://res.cloudinary.com/dkappxhfr/image/upload/v1701541725/Pet/fbczmvukoqzcn2pvfykb.jpg',
    discount: 5, animalCategory: "dog", providerID: 1, brandID: "3", description: "nice product for a dog", productType: "toy",
    isAvailable: "true", hasTax: "true"};
    spyOn(productService, 'getById').and.returnValue(of(mockProduct));

    component.ngOnInit();

    expect(productService.getById).toHaveBeenCalledWith(2);
    expect(component.product).toEqual(mockProduct);
    expect(component.productImage).toEqual('https://res.cloudinary.com/dkappxhfr/image/upload/v1701541725/Pet/fbczmvukoqzcn2pvfykb.jpg');
    expect(component.productName).toEqual('doggy toy');
    expect(component.productPrice).toEqual(30);
  });

  it('should return an empty string for valid quantity', () => {
    component.productQuantity.setValue(5);
    expect(component.quantityValidation()).toEqual('');
  });

  it('should return an error message for required quantity', () => {
    component.productQuantity.setValue(null);
    expect(component.quantityValidation()).toContain('fill it');
  });

  it('should return an error message for quantity exceeding the maximum', () => {
    component.productQuantity.setValue(15);
    expect(component.quantityValidation()).toContain('1-10');
  });



});