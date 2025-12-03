import { Component, Input, AfterViewInit, OnDestroy, PLATFORM_ID, Inject, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Google AdSense Component
 * 
 * A reusable component for displaying Google AdSense ads.
 * Supports responsive and fixed-size display ads.
 * 
 * Usage:
 * <app-adsense 
 *   [adClient]="'ca-pub-XXXXXXXXXXXXXXXX'"
 *   [adSlot]="'1234567890'"
 *   [adFormat]="'auto'"
 *   [display]="'block'"
 *   [width]="728"
 *   [height]="90">
 * </app-adsense>
 */
@Component({
  selector: 'app-adsense',
  standalone: true,
  template: `
    <ins class="adsbygoogle"
         [style.display]="display"
         [attr.data-ad-client]="adClient"
         [attr.data-ad-slot]="adSlot"
         [attr.data-ad-format]="adFormat"
         [attr.data-full-width-responsive]="fullWidthResponsive"
         [style.width.px]="width"
         [style.height.px]="height">
    </ins>
  `,
  styles: [`
    :host {
      display: block;
      margin: 20px 0;
      text-align: center;
    }
    
    .adsbygoogle {
      overflow: hidden;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdsenseComponent implements AfterViewInit, OnDestroy {
  /** AdSense Publisher ID (ca-pub-XXXXXXXXXXXXXXXX) */
  @Input() adClient: string = '';
  
  /** AdSense Ad Slot ID */
  @Input() adSlot: string = '';
  
  /** Ad format: 'auto', 'horizontal', 'vertical', 'rectangle' */
  @Input() adFormat: string = 'auto';
  
  /** Display style: 'block', 'inline-block' */
  @Input() display: string = 'block';
  
  /** Enable full width responsive (true for responsive ads) */
  @Input() fullWidthResponsive: string = 'true';
  
  /** Fixed width in pixels (optional, for fixed-size ads) */
  @Input() width?: number;
  
  /** Fixed height in pixels (optional, for fixed-size ads) */
  @Input() height?: number;
  
  /** Disable ads in development mode */
  @Input() disableInDev: boolean = true;

  private adsPushed = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadAd();
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  private loadAd(): void {
    try {
      // Check if we should show ads (disable in dev if configured)
      if (this.disableInDev && !this.isProduction()) {
        console.log('AdSense: Ads disabled in development mode');
        return;
      }

      // Ensure adClient is provided
      if (!this.adClient) {
        console.warn('AdSense: adClient is required');
        return;
      }

      // Load AdSense script if not already loaded
      if (!this.isAdSenseScriptLoaded()) {
        this.loadAdSenseScript();
      }

      // Push ad to AdSense
      this.pushAd();
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }

  private isAdSenseScriptLoaded(): boolean {
    return typeof (window as any).adsbygoogle !== 'undefined';
  }

  private loadAdSenseScript(): void {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.crossOrigin = 'anonymous';
    
    // Add data-ad-client attribute
    if (this.adClient) {
      script.setAttribute('data-ad-client', this.adClient);
    }
    
    document.head.appendChild(script);
  }

  private pushAd(): void {
    if (this.adsPushed) return;
    
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
        this.adsPushed = true;
      } catch (e) {
        console.error('AdSense push error:', e);
      }
    }, 100);
  }

  private isProduction(): boolean {
    // Check if running in production mode
    return window.location.hostname !== 'localhost' && 
           window.location.hostname !== '127.0.0.1';
  }
}
