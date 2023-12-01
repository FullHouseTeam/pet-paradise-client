import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingDataComponentComponent } from './shipping-data-component.component';

describe('ShippingDataComponentComponent', () => {
  let component: ShippingDataComponentComponent;
  let fixture: ComponentFixture<ShippingDataComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingDataComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShippingDataComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
