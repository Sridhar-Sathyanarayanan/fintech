import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, inject, ChangeDetectionStrategy, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModules } from '../../material.standalone';
import { CookieConsentService, CookieConsent } from '../../../services/cookie-consent.service';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModules],
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CookieConsentComponent implements OnInit {
  private cookieService = inject(CookieConsentService);
  
  showBanner = this.cookieService.showBanner;
  showSettings = this.cookieService.showSettings;
  
  // Cookie preferences
  necessaryCookies = signal(true); // Always true, cannot be disabled
  analyticsCookies = signal(false);
  advertisingCookies = signal(false);

  private readonly CONSENT_KEY = 'amkrtech_cookie_consent';
  private readonly CONSENT_VERSION = '1.0';

  ngOnInit(): void {
    this.checkConsent();
  }

  private checkConsent(): void {
    const stored = localStorage.getItem(this.CONSENT_KEY);
    if (!stored) {
      // Show banner after a short delay for better UX
      setTimeout(() => this.showBanner.set(true), 1000);
    } else {
      try {
        const consent: CookieConsent & { version?: string } = JSON.parse(stored);
        // Check if consent version matches
        if (consent.version !== this.CONSENT_VERSION) {
          setTimeout(() => this.showBanner.set(true), 1000);
        } else {
          this.applyConsent(consent);
        }
      } catch (e) {
        setTimeout(() => this.showBanner.set(true), 1000);
      }
    }
  }

  private applyConsent(consent: CookieConsent): void {
    this.analyticsCookies.set(consent.analytics);
    this.advertisingCookies.set(consent.advertising);
    
    // Apply consent to Google AdSense and Analytics
    if (consent.advertising) {
      this.enableAdvertising();
    }
    if (consent.analytics) {
      this.enableAnalytics();
    }
  }

  private saveConsent(): void {
    const consent = {
      necessary: true,
      analytics: this.analyticsCookies(),
      advertising: this.advertisingCookies(),
      timestamp: Date.now(),
      version: this.CONSENT_VERSION,
    };
    localStorage.setItem(this.CONSENT_KEY, JSON.stringify(consent));
  }

  acceptAll(): void {
    this.analyticsCookies.set(true);
    this.advertisingCookies.set(true);
    this.saveConsent();
    this.enableAdvertising();
    this.enableAnalytics();
    this.closeBanner();
  }

  acceptNecessary(): void {
    this.analyticsCookies.set(false);
    this.advertisingCookies.set(false);
    this.saveConsent();
    this.closeBanner();
  }

  savePreferences(): void {
    this.saveConsent();
    if (this.advertisingCookies()) {
      this.enableAdvertising();
    }
    if (this.analyticsCookies()) {
      this.enableAnalytics();
    }
    this.closeSettings();
    this.closeBanner();
  }

  openSettings(): void {
    this.showSettings.set(true);
  }

  closeSettings(): void {
    this.showSettings.set(false);
  }

  closeBanner(): void {
    this.showBanner.set(false);
  }

  private enableAdvertising(): void {
    // Enable Google AdSense
    if (typeof window !== 'undefined') {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
    }
  }

  private enableAnalytics(): void {
    // Enable Google Analytics or other analytics tools
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  }

  toggleAnalytics(): void {
    this.analyticsCookies.set(!this.analyticsCookies());
  }

  toggleAdvertising(): void {
    this.advertisingCookies.set(!this.advertisingCookies());
  }

  getCookieCount(): number {
    let count = 1; // Necessary always enabled
    if (this.analyticsCookies()) count++;
    if (this.advertisingCookies()) count++;
    return count;
  }
}
