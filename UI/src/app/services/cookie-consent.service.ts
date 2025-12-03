import { Injectable, signal } from '@angular/core';

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: number;
  version: string;
}

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  private readonly CONSENT_KEY = 'amkrtech_cookie_consent';
  private readonly CONSENT_VERSION = '1.0';

  showBanner = signal(false);
  showSettings = signal(false);

  checkConsent(): boolean {
    const stored = localStorage.getItem(this.CONSENT_KEY);
    if (!stored) {
      return false;
    }
    try {
      const consent: CookieConsent = JSON.parse(stored);
      return consent.version === this.CONSENT_VERSION;
    } catch (e) {
      return false;
    }
  }

  getConsent(): CookieConsent | null {
    const stored = localStorage.getItem(this.CONSENT_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  }

  openSettings(): void {
    this.showSettings.set(true);
  }

  openBanner(): void {
    this.showBanner.set(true);
  }
}
