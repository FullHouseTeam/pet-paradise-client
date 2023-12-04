import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopCartComponent } from './shop-cart.component';
import { ProductService } from '../../services/products/product.service';
import { PurchaseService } from '../../services/purchases/purchase.service';
import { SaleService } from '../../services/sales/sale.service';
import { SharedService } from '../../services/globalAttributes/shared.service';
import { of } from 'rxjs';

describe('ShopCartComponent', () => {
  let component: ShopCartComponent;
  let fixture: ComponentFixture<ShopCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopCartComponent],
      providers: [
        { provide: ProductService, useValue: jasmine.createSpyObj('ProductService', ['getList', 'getById', 'update']) },
        { provide: PurchaseService, useValue: jasmine.createSpyObj('PurchaseService', ['getList']) },
        { provide: SaleService, useValue: jasmine.createSpyObj('SaleService', ['getList']) },
        { provide: SharedService, useValue: jasmine.createSpyObj('SharedService', ['getGlobalVariable']) },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCartComponent);
    component = fixture.componentInstance;
    spyOn(component, 'getTotalPrice').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component and call getTotalPrice', () => {
    const productService = TestBed.inject(ProductService);
    const purchaseService = TestBed.inject(PurchaseService);
    const saleService = TestBed.inject(SaleService);
    const sharedService = TestBed.inject(SharedService);

    spyOn(productService, 'getList').and.returnValue(of([]));
    spyOn(purchaseService, 'getList').and.returnValue(of([]));
    spyOn(saleService, 'getList').and.returnValue(of([]));
    spyOn(sharedService, 'getGlobalVariable').and.returnValue('123');

    component.ngOnInit();

    expect(productService.getList).toHaveBeenCalled();
    expect(purchaseService.getList).toHaveBeenCalled();
    expect(saleService.getList).toHaveBeenCalled();
    expect(sharedService.getGlobalVariable).toHaveBeenCalled();
    expect(component.purchases).toEqual([]);
    expect(component.sales).toEqual([]);
    expect(component.customerPurchases).toEqual([]);
    expect(component.products).toEqual([]);
    expect(component.customerProducts).toEqual([]);
    expect(component.controllers.length).toEqual(0);
    expect(component.getTotalPrice).toHaveBeenCalled();
  });

  it('should calculate total price correctly', () => {
    const productService = TestBed.inject(ProductService);
    const purchaseService = TestBed.inject(PurchaseService);

    const mockPurchases = [
      {
        "purchaseID": 46,
        "totalPrice": 1,
        "reportDate": "2023-12-04 14:29:11",
        "obtainedTaxes": 1,
        "applicationTax": 7.5,
        "deliveryTime": 1,
        "localQuantity": 1,
        "productID": 10,
        "userID": 11,
        "isAvailable": "true"
      }
    ];

    const mockProducts = [
      {
        "productID": 10,
        "name": "Automatic Cat Feeder",
        "price": 400,
        "quantity": 222,
        "discount": 10,
        "animalCategory": "cat",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701693817/Pet/uejpuj0riz2gre0kuhnx.jpg",
        "description": "Say No to Overeating The PETLIBRO AIR automatic cat feeders top lid has a press to lock button to firmly lock the food tank Say goodbye to voracious cats",
        "productType": "house",
        "brandID": "2",
        "providerID": 1,
        "isAvailable": "true",
        "hasTax": "true"
      }
    ];

    spyOn(purchaseService, 'getList').and.returnValue(of(mockPurchases));
    spyOn(productService, 'getList').and.returnValue(of(mockProducts));

    component.getTotalPrice();
    const expectedTotalPrice = mockPurchases[0].localQuantity * (mockProducts[0].price - (mockProducts[0].price * (mockProducts[0].discount / 100)));
    expect(component.totalPrice).toEqual(expectedTotalPrice);
  });


  it('should handle zip code change', () => {
    component.receiveZipCode('12345');
    expect(component.zipCode).toEqual('12345');
  });

  it('should handle email change', () => {
    component.receiveEmail('test@example.com');
    expect(component.email).toEqual('test@example.com');
  });

  it('should handle card number change', () => {
    component.receiveCardNumber('1234-5678-9012-3456');
    expect(component.cardNumber).toEqual('1234-5678-9012-3456');
  });

});