import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorLayoutComponent } from './calculator-layout.component';

describe('CalculatorLayoutComponent', () => {
  let component: CalculatorLayoutComponent;
  let fixture: ComponentFixture<CalculatorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorLayoutComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title when provided', () => {
    component.title = 'Test Calculator';
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('.calculator-title');
    expect(titleElement?.textContent).toContain('Test Calculator');
  });

  it('should render subtitle when provided', () => {
    component.subtitle = 'Test Subtitle';
    fixture.detectChanges();
    const subtitleElement = fixture.nativeElement.querySelector('.calculator-subtitle');
    expect(subtitleElement?.textContent).toContain('Test Subtitle');
  });
});
