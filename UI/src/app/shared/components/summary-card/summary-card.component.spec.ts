import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryCardComponent } from './summary-card.component';

describe('SummaryCardComponent', () => {
  let component: SummaryCardComponent;
  let fixture: ComponentFixture<SummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title when provided', () => {
    component.title = 'Summary';
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('.card-title');
    expect(titleElement?.textContent).toContain('Summary');
  });

  it('should render icon when provided', () => {
    component.icon = 'summarize';
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.card-icon');
    expect(icon?.textContent).toContain('summarize');
  });

  it('should render summary information when provided', () => {
    component.summary = { label: 'Total', value: '₹1,00,000' };
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.summary-label');
    const value = fixture.nativeElement.querySelector('.summary-value');
    expect(label?.textContent).toContain('Total');
    expect(value?.textContent).toContain('₹1,00,000');
  });
});
