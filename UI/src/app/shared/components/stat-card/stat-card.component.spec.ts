import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatCardComponent } from './stat-card.component';

describe('StatCardComponent', () => {
  let component: StatCardComponent;
  let fixture: ComponentFixture<StatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render value when provided', () => {
    component.value = '₹50,000';
    fixture.detectChanges();
    const valueElement = fixture.nativeElement.querySelector('.stat-value');
    expect(valueElement?.textContent).toContain('₹50,000');
  });

  it('should render label when provided', () => {
    component.label = 'Total Amount';
    fixture.detectChanges();
    const labelElement = fixture.nativeElement.querySelector('.stat-label');
    expect(labelElement?.textContent).toContain('Total Amount');
  });

  it('should render icon when provided', () => {
    component.icon = 'attach_money';
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('mat-icon');
    expect(icon?.textContent).toContain('attach_money');
  });
});
