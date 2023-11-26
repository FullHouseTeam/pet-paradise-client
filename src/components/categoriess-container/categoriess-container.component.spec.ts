import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriessContainerComponent } from './categoriess-container.component';

describe('CategoriessContainerComponent', () => {
  let component: CategoriessContainerComponent;
  let fixture: ComponentFixture<CategoriessContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriessContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriessContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
