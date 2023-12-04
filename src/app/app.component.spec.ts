import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../components/home/home.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [AppComponent, HomeComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it(`should create the app`, () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pet-paradise-client'`, () => {
    expect(app.title).toEqual('pet-paradise-client');
  });

  // it('should render the title', () => {
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.title').textContent).toContain(
  //     'pet-paradise-client'
  //   );
  // });
});
