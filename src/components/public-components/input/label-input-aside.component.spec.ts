import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelInputAsideComponent } from './label-input-aside.component';

describe('LabelInputAsideComponent', () => {
  let component: LabelInputAsideComponent;
  let fixture: ComponentFixture<LabelInputAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelInputAsideComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LabelInputAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
