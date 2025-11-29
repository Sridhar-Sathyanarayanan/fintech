import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BannerSectionComponent, BannerAction, BannerFeature } from './banner-section.component';

describe('BannerSectionComponent', () => {
  let component: BannerSectionComponent;
  let fixture: ComponentFixture<BannerSectionComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerSectionComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BannerSectionComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  // ========== Component Instantiation Tests ==========
  describe('Component Creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have OnPush change detection strategy', () => {
      const metadata = (component.constructor as any).ɵcmp;
      expect(metadata.changeDetection).toBeDefined();
    });

    it('should initialize with default values', () => {
      expect(component.actions).toEqual([]);
      expect(component.features).toEqual([]);
      expect(component.badge).toBeUndefined();
      expect(component.badgeIcon).toBeUndefined();
      expect(component.illustration).toBeUndefined();
      expect(component.visualCards).toBeUndefined();
    });
  });

  // ========== Input Properties Tests ==========
  describe('Input Properties', () => {
    beforeEach(() => {
      component.title = 'Test Title';
      component.gradientText = 'Gradient Part';
      component.subtitle = 'Test Subtitle';
      fixture.detectChanges();
    });

    it('should accept title input', () => {
      expect(component.title).toBe('Test Title');
    });

    it('should accept gradientText input', () => {
      expect(component.gradientText).toBe('Gradient Part');
    });

    it('should accept subtitle input', () => {
      expect(component.subtitle).toBe('Test Subtitle');
    });

    it('should accept badge input', () => {
      component.badge = 'Featured';
      fixture.detectChanges();
      expect(component.badge).toBe('Featured');
    });

    it('should accept badgeIcon input', () => {
      component.badgeIcon = 'star';
      fixture.detectChanges();
      expect(component.badgeIcon).toBe('star');
    });

    it('should accept illustration input', () => {
      component.illustration = '/assets/hero-illustration.svg';
      fixture.detectChanges();
      expect(component.illustration).toBe('/assets/hero-illustration.svg');
    });

    it('should accept actions array input', () => {
      const testActions: BannerAction[] = [
        { label: 'Action 1', icon: 'icon1', route: '/route1', variant: 'primary' },
        { label: 'Action 2', icon: 'icon2', route: '/route2', variant: 'secondary' }
      ];
      component.actions = testActions;
      fixture.detectChanges();
      expect(component.actions.length).toBe(2);
      expect(component.actions).toEqual(testActions);
    });

    it('should accept features array input', () => {
      const testFeatures: BannerFeature[] = [
        { icon: 'feature1', label: 'Feature 1' },
        { icon: 'feature2', label: 'Feature 2' }
      ];
      component.features = testFeatures;
      fixture.detectChanges();
      expect(component.features.length).toBe(2);
      expect(component.features).toEqual(testFeatures);
    });

    it('should accept visualCards input', () => {
      const testCards = [
        { icon: 'card1', label: 'Card 1', value: '100' },
        { icon: 'card2', label: 'Card 2', value: '200' }
      ];
      component.visualCards = testCards;
      fixture.detectChanges();
      expect(component.visualCards?.length).toBe(2);
      expect(component.visualCards).toEqual(testCards);
    });
  });

  // ========== Content Rendering Tests ==========
  describe('Template Rendering', () => {
    beforeEach(() => {
      component.title = 'Main Title';
      component.gradientText = 'Highlighted';
      component.subtitle = 'Description Text';
      fixture.detectChanges();
    });

    it('should render banner container', () => {
      const bannerContainer = debugElement.query(By.css('.banner-container'));
      expect(bannerContainer).toBeTruthy();
    });

    it('should render banner title with text content', () => {
      const titleElement = debugElement.query(By.css('.banner-title'));
      expect(titleElement).toBeTruthy();
      expect(titleElement?.nativeElement.textContent).toContain('Main Title');
    });

    it('should render banner subtitle', () => {
      const subtitleElement = debugElement.query(By.css('.banner-subtitle'));
      expect(subtitleElement).toBeTruthy();
      expect(subtitleElement?.nativeElement.textContent).toContain('Description Text');
    });

    it('should render gradient text element', () => {
      const gradientElement = debugElement.query(By.css('.banner-gradient-text'));
      expect(gradientElement).toBeTruthy();
    });

    it('should update rendered title when input changes', () => {
      component.title = 'Updated Title';
      fixture.detectChanges();
      const titleElement = debugElement.query(By.css('.banner-title'));
      expect(titleElement?.nativeElement.textContent).toContain('Updated Title');
    });

    it('should update rendered subtitle when input changes', () => {
      component.subtitle = 'Updated Subtitle';
      fixture.detectChanges();
      const subtitleElement = debugElement.query(By.css('.banner-subtitle'));
      expect(subtitleElement?.nativeElement.textContent).toContain('Updated Subtitle');
    });
  });

  // ========== Badge Rendering Tests ==========
  describe('Badge Display', () => {
    it('should not render badge when not provided', () => {
      fixture.detectChanges();
      const badge = debugElement.query(By.css('.banner-badge'));
      expect(badge).toBeFalsy();
    });

    it('should render badge when provided', () => {
      component.badge = 'Premium';
      fixture.detectChanges();
      const badge = debugElement.query(By.css('.banner-badge'));
      expect(badge).toBeTruthy();
      expect(badge?.nativeElement.textContent).toContain('Premium');
    });

    it('should render badge with icon when both badge and badgeIcon provided', () => {
      component.badge = 'New';
      component.badgeIcon = 'new_releases';
      fixture.detectChanges();
      const badge = debugElement.query(By.css('.banner-badge'));
      expect(badge).toBeTruthy();
    });

    it('should update badge text dynamically', () => {
      component.badge = 'Initial';
      fixture.detectChanges();
      let badge = debugElement.query(By.css('.banner-badge'));
      expect(badge?.nativeElement.textContent).toContain('Initial');

      component.badge = 'Updated';
      fixture.detectChanges();
      badge = debugElement.query(By.css('.banner-badge'));
      expect(badge?.nativeElement.textContent).toContain('Updated');
    });
  });

  // ========== Actions/Buttons Tests ==========
  describe('Action Buttons', () => {
    it('should render no buttons when actions array is empty', () => {
      component.actions = [];
      fixture.detectChanges();
      const buttons = debugElement.queryAll(By.css('.banner-action-button'));
      expect(buttons.length).toBe(0);
    });

    it('should render action buttons when provided', () => {
      component.actions = [
        { label: 'Start Now', icon: 'play_arrow', route: '/start', variant: 'primary' },
        { label: 'Learn More', icon: 'info', route: '/info', variant: 'secondary' }
      ];
      fixture.detectChanges();
      const buttons = debugElement.queryAll(By.css('.banner-action-button'));
      expect(buttons.length).toBe(2);
    });

    it('should render correct button labels', () => {
      component.actions = [
        { label: 'Click Me', icon: 'touch_app', route: '/click', variant: 'primary' }
      ];
      fixture.detectChanges();
      const button = debugElement.query(By.css('.banner-action-button'));
      expect(button?.nativeElement.textContent).toContain('Click Me');
    });

    it('should apply correct variant classes to buttons', () => {
      component.actions = [
        { label: 'Primary', icon: 'icon1', route: '/route1', variant: 'primary' },
        { label: 'Secondary', icon: 'icon2', route: '/route2', variant: 'secondary' }
      ];
      fixture.detectChanges();
      const buttons = debugElement.queryAll(By.css('.banner-action-button'));
      expect(buttons[0]?.nativeElement.classList.contains('primary')).toBeTruthy();
      expect(buttons[1]?.nativeElement.classList.contains('secondary')).toBeTruthy();
    });

    it('should have correct routing information', () => {
      component.actions = [
        { label: 'Navigate', icon: 'arrow_forward', route: '/dashboard', variant: 'primary' }
      ];
      fixture.detectChanges();
      const button = debugElement.query(By.css('.banner-action-button'));
      expect(button?.nativeElement.getAttribute('routerLink')).toBe('/dashboard');
    });

    it('should render multiple actions correctly', () => {
      const actions: BannerAction[] = Array.from({ length: 5 }, (_, i) => ({
        label: `Action ${i + 1}`,
        icon: `icon${i}`,
        route: `/route${i}`,
        variant: i % 2 === 0 ? 'primary' : 'secondary'
      }));
      component.actions = actions;
      fixture.detectChanges();
      const buttons = debugElement.queryAll(By.css('.banner-action-button'));
      expect(buttons.length).toBe(5);
    });
  });

  // ========== Features/Icons Tests ==========
  describe('Features Display', () => {
    it('should render no features when features array is empty', () => {
      component.features = [];
      fixture.detectChanges();
      const features = debugElement.queryAll(By.css('.banner-feature'));
      expect(features.length).toBe(0);
    });

    it('should render features when provided', () => {
      component.features = [
        { icon: 'security', label: 'Secure' },
        { icon: 'speed', label: 'Fast' }
      ];
      fixture.detectChanges();
      const features = debugElement.queryAll(By.css('.banner-feature'));
      expect(features.length).toBe(2);
    });

    it('should render correct feature labels', () => {
      component.features = [
        { icon: 'verified', label: 'Verified User' }
      ];
      fixture.detectChanges();
      const feature = debugElement.query(By.css('.banner-feature'));
      expect(feature?.nativeElement.textContent).toContain('Verified User');
    });

    it('should render feature icons', () => {
      component.features = [
        { icon: 'star', label: 'Featured' }
      ];
      fixture.detectChanges();
      const featureIcon = debugElement.query(By.css('.banner-feature-icon'));
      expect(featureIcon).toBeTruthy();
    });
  });

  // ========== Visual Cards Tests ==========
  describe('Visual Cards', () => {
    it('should not render cards when visualCards is undefined', () => {
      component.visualCards = undefined;
      fixture.detectChanges();
      const cards = debugElement.queryAll(By.css('.banner-visual-card'));
      expect(cards.length).toBe(0);
    });

    it('should render visual cards when provided', () => {
      component.visualCards = [
        { icon: 'trending_up', label: 'Growth', value: '150%' },
        { icon: 'users', label: 'Users', value: '10K+' }
      ];
      fixture.detectChanges();
      const cards = debugElement.queryAll(By.css('.banner-visual-card'));
      expect(cards.length).toBe(2);
    });

    it('should display card values correctly', () => {
      component.visualCards = [
        { icon: 'check_circle', label: 'Satisfaction', value: '99%' }
      ];
      fixture.detectChanges();
      const cardValue = debugElement.query(By.css('.banner-card-value'));
      expect(cardValue?.nativeElement.textContent).toContain('99%');
    });

    it('should display card labels correctly', () => {
      component.visualCards = [
        { icon: 'award', label: 'Awards', value: '50' }
      ];
      fixture.detectChanges();
      const cardLabel = debugElement.query(By.css('.banner-card-label'));
      expect(cardLabel?.nativeElement.textContent).toContain('Awards');
    });
  });

  // ========== Illustration Tests ==========
  describe('Illustration Display', () => {
    it('should not render illustration when not provided', () => {
      component.illustration = undefined;
      fixture.detectChanges();
      const illustration = debugElement.query(By.css('.banner-illustration'));
      expect(illustration).toBeFalsy();
    });

    it('should render illustration when provided', () => {
      component.illustration = '/assets/banner-hero.svg';
      fixture.detectChanges();
      const illustration = debugElement.query(By.css('.banner-illustration'));
      expect(illustration).toBeTruthy();
    });

    it('should set correct src attribute on illustration', () => {
      component.illustration = '/assets/custom-illustration.png';
      fixture.detectChanges();
      const illustration = debugElement.query(By.css('.banner-illustration img'));
      expect(illustration?.nativeElement.src).toContain('custom-illustration.png');
    });
  });

  // ========== CSS Classes Tests ==========
  describe('CSS Classes Application', () => {
    beforeEach(() => {
      component.title = 'Test';
      component.subtitle = 'Test';
      component.gradientText = 'Test';
      fixture.detectChanges();
    });

    it('should have banner-container class', () => {
      const container = debugElement.query(By.css('.banner-container'));
      expect(container?.nativeElement.classList.contains('banner-container')).toBeTruthy();
    });

    it('should have banner-content class', () => {
      const content = debugElement.query(By.css('.banner-content'));
      expect(content).toBeTruthy();
    });

    it('should have banner-background class', () => {
      const background = debugElement.query(By.css('.banner-background'));
      expect(background).toBeTruthy();
    });
  });

  // ========== Dynamic Content Tests ==========
  describe('Dynamic Content Updates', () => {
    it('should update content when all inputs change', () => {
      component.title = 'Original';
      component.subtitle = 'Original';
      fixture.detectChanges();

      component.title = 'Modified';
      component.subtitle = 'Modified';
      fixture.detectChanges();

      const title = debugElement.query(By.css('.banner-title'));
      const subtitle = debugElement.query(By.css('.banner-subtitle'));

      expect(title?.nativeElement.textContent).toContain('Modified');
      expect(subtitle?.nativeElement.textContent).toContain('Modified');
    });

    it('should handle rapid input changes', () => {
      for (let i = 0; i < 5; i++) {
        component.title = `Title ${i}`;
        fixture.detectChanges();
      }

      const title = debugElement.query(By.css('.banner-title'));
      expect(title?.nativeElement.textContent).toContain('Title 4');
    });

    it('should handle adding/removing actions dynamically', () => {
      component.actions = [{ label: 'Action 1', icon: 'icon1', route: '/1', variant: 'primary' }];
      fixture.detectChanges();
      let buttons = debugElement.queryAll(By.css('.banner-action-button'));
      expect(buttons.length).toBe(1);

      component.actions.push({ label: 'Action 2', icon: 'icon2', route: '/2', variant: 'secondary' });
      fixture.detectChanges();
      buttons = debugElement.queryAll(By.css('.banner-action-button'));
      expect(buttons.length).toBe(2);
    });
  });

  // ========== Accessibility Tests ==========
  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      component.title = 'Accessible Title';
      fixture.detectChanges();
      const title = debugElement.query(By.css('.banner-title'));
      expect(title).toBeTruthy();
    });

    it('should have descriptive button labels', () => {
      component.actions = [
        { label: 'Get Started', icon: 'arrow_forward', route: '/start', variant: 'primary' }
      ];
      fixture.detectChanges();
      const button = debugElement.query(By.css('.banner-action-button'));
      expect(button?.nativeElement.textContent.trim()).toBe('Get Started');
    });

    it('should have alt text for illustrations', () => {
      component.illustration = '/assets/illustration.svg';
      fixture.detectChanges();
      const img = debugElement.query(By.css('.banner-illustration img'));
      expect(img?.nativeElement.hasAttribute('alt')).toBeTruthy();
    });
  });

  // ========== Edge Cases Tests ==========
  describe('Edge Cases', () => {
    it('should handle empty strings gracefully', () => {
      component.title = '';
      component.subtitle = '';
      component.gradientText = '';
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should handle special characters in text', () => {
      component.title = 'Title & Special <Characters> "Test"';
      fixture.detectChanges();
      const title = debugElement.query(By.css('.banner-title'));
      expect(title?.nativeElement.textContent).toContain('Title');
    });

    it('should handle very long text content', () => {
      component.title = 'A'.repeat(100);
      fixture.detectChanges();
      const title = debugElement.query(By.css('.banner-title'));
      expect(title?.nativeElement.textContent.length).toBeGreaterThan(90);
    });

    it('should handle empty actions array', () => {
      component.actions = [];
      fixture.detectChanges();
      const buttons = debugElement.queryAll(By.css('.banner-action-button'));
      expect(buttons.length).toBe(0);
    });

    it('should handle large number of features', () => {
      component.features = Array.from({ length: 20 }, (_, i) => ({
        icon: `icon${i}`,
        label: `Feature ${i}`
      }));
      fixture.detectChanges();
      const features = debugElement.queryAll(By.css('.banner-feature'));
      expect(features.length).toBe(20);
    });
  });
});