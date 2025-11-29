import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureCardComponent } from './feature-card.component';

describe('FeatureCardComponent', () => {
  let component: FeatureCardComponent;
  let fixture: ComponentFixture<FeatureCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title when provided', () => {
    component.title = 'Test Feature';
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('.feature-title');
    expect(titleElement?.textContent).toContain('Test Feature');
  });

  it('should render description when provided', () => {
    component.description = 'Test Description';
    fixture.detectChanges();
    const descElement = fixture.nativeElement.querySelector('.feature-description');
    expect(descElement?.textContent).toContain('Test Description');
  });

  it('should apply color class to icon wrapper', () => {
    component.color = 'accent';
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('.icon-wrapper');
    expect(wrapper?.classList.contains('accent')).toBeTruthy();
  });
});
