import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDataComponentComponent } from './payment-data-component.component';

describe('PaymentDataComponentComponent', () => {
  let component: PaymentDataComponentComponent;
  let fixture: ComponentFixture<PaymentDataComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDataComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentDataComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
