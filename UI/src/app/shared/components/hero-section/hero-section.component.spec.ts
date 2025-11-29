import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSectionComponent } from './hero-section.component';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    component.title = 'Welcome';
    component.gradientText = 'to our app';
    component.subtitle = 'Start your journey';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and gradient text', () => {
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('.hero-title');
    expect(titleElement?.textContent).toContain('Welcome');
    expect(titleElement?.textContent).toContain('to our app');
  });

  it('should render subtitle', () => {
    fixture.detectChanges();
    const subtitleElement = fixture.nativeElement.querySelector('.hero-subtitle');
    expect(subtitleElement?.textContent).toContain('Start your journey');
  });

  it('should render badge when provided', () => {
    component.badge = 'New';
    fixture.detectChanges();
    const badgeElement = fixture.nativeElement.querySelector('.hero-badge');
    expect(badgeElement?.textContent).toContain('New');
  });

  it('should render action buttons', () => {
    component.actions = [
      { label: 'Get Started', icon: 'arrow_forward', route: '/start', variant: 'primary' }
    ];
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
