import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerPageComponent } from './customer-page.component';

describe('CustomerPageComponent', () => {
  let component: CustomerPageComponent;
  let fixture: ComponentFixture<CustomerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerPageComponent], // Declare the component in the testing module
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
