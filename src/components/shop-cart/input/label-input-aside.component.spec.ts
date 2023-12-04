import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelInputAsideComponent } from './label-input-aside.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LabelInputAsideComponent', () => {
  let component: LabelInputAsideComponent;
  let fixture: ComponentFixture<LabelInputAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelInputAsideComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelInputAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should update card number error message', () => {
    component.cardNumberEntry.setValue('invalidCardNumber');
    expect(component.getCardNumberErrorMessage()).toContain('wrong format');
  });

  it('should update NIT error message', () => {
    component.nitEntry.setValue('invalidNIT');
    expect(component.getNITErrorMessage()).toContain('wrong format');
  });

  it('should update ZIP code error message', () => {
    component.zipCodeEntry.setValue('invalidZIPCode');
    expect(component.getZipCodeErrorMessage()).toContain('wrong format');
  });

  it('should update email error message', () => {
    component.emailEntry.setValue('invalidEmail');
    expect(component.getEmailErrorMessage()).toContain('wrong format');
  });

  it('should update CVV error message', () => {
    component.cvvEntry.setValue('invalidCVV');
    expect(component.getCVVErrorMessage()).toContain('wrong format');
  });

  it('should update month validation message', () => {
    component.monthsEntry.setValue(13);
    expect(component.getMonthValidation()).toContain('value 1-12');
  });

  it('should update year validation message', () => {
    component.yearsEntry.setValue(2036);
    expect(component.getYearValidation()).toContain('value <2036');
  });

  it('should prepare purchase to post', () => {
    const purchase = {
      purchaseID: 2,
      isAvailable: "true",
      totalPrice: 100,
      productID: 1,
      localQuantity: 2,
      userID: 3,
      deliveryTime: 24,
      obtainedTaxes: 10,
      reportDate: "2023-12-04 14:29:11",
      applicationTax: 3,
    };
    const result = component.preparePurchaseToPost(purchase);
    expect(result.isAvailable).toEqual(true);
    expect(result.totalPrice).toEqual(100);
    expect(result.productID).toEqual(1);
    expect(result.localQuantity).toEqual(2);
    expect(result.userID).toEqual(3);
    expect(result.deliveryTime).toEqual(24);
    expect(result.obtainedTaxes).toEqual(10);
  });

});