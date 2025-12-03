import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModules } from '../shared/material.standalone';
import { BannerSectionComponent, FeatureCardComponent } from '../shared/components';
import { PRIVACY_CONSTANTS, UI_CONSTANTS } from '../models/app.constants';
import { 
  PolicySection, 
  InfoCategory, 
  UsageItem, 
  SecurityFeature, 
  UserRight, 
  CookieInfo 
} from '../models/ui.models';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModules, BannerSectionComponent, FeatureCardComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyComponent implements OnInit {
  privacyFeatures = [
    {
      icon: 'check_circle',
      label: 'Secure Data Storage',
    },
    {
      icon: 'block',
      label: 'No Third-Party Sharing',
    },
    {
      icon: 'visibility',
      label: 'Full Transparency',
    },
  ];

  activeSection: string = '';
  scrollProgress: number = 0;
  lastUpdated: string = PRIVACY_CONSTANTS.LAST_UPDATED;

  policySections: PolicySection[] = [
    { id: 'introduction', title: 'Introduction', icon: 'description' },
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: 'visibility',
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: 'settings',
    },
    { id: 'data-security', title: 'Data Security', icon: 'lock' },
    { id: 'advertising', title: 'Advertising & Third-Party Services', icon: 'ads_click' },
    { id: 'your-rights', title: 'Your Rights', icon: 'verified_user' },
    { id: 'cookies', title: 'Cookies & Tracking', icon: 'cookie' },
    { id: 'data-sources', title: 'Data Source Attribution', icon: 'source' },
    { id: 'market-data', title: 'Market Data Disclaimer', icon: 'trending_up' },
    { id: 'contact', title: 'Contact Us', icon: 'contact_support' },
  ];

  infoCategories: InfoCategory[] = [
    {
      title: 'Personal Information',
      items: [
        'Full Name',
        'Email Address',
        'Phone Number',
        'Residential Address',
      ],
    },
    {
      title: 'Financial Information',
      items: [
        'Income Details',
        'Investment Information',
        'Bank Account Details',
        'PAN/Aadhaar Numbers',
      ],
    },
    {
      title: 'Tax Documents',
      items: [
        'Income Tax Returns',
        'Form 16/16A',
        'Financial Statements',
        'Tax Computation Sheets',
      ],
    },
    {
      title: 'Communication Data',
      items: [
        'Service Inquiries',
        'Support Requests',
        'Consultation Records',
        'Email Correspondence',
      ],
    },
  ];

  usageItems: UsageItem[] = [
    {
      title: 'Service Delivery',
      desc: 'To provide finance and tax consultancy services, prepare tax returns, and offer financial planning advice.',
    },
    {
      title: 'Communication',
      desc: 'To respond to your inquiries, send service updates, and provide customer support.',
    },
    {
      title: 'Legal Compliance',
      desc: 'To comply with legal obligations, regulatory requirements, and government requests.',
    },
    {
      title: 'Service Improvement',
      desc: 'To analyze service usage and improve our offerings, user experience, and operational efficiency.',
    },
    {
      title: 'Record Keeping',
      desc: 'To maintain accurate records for accounting, auditing, and professional practice requirements.',
    },
    {
      title: 'Security',
      desc: 'To protect against unauthorized access, fraud, and ensure the security of your information.',
    },
  ];

  securityFeatures: SecurityFeature[] = [
    {
      icon: 'enhanced_encryption',
      title: 'Encryption',
      desc: 'All sensitive data is encrypted both in transit and at rest using industry-standard protocols.',
    },
    {
      icon: 'admin_panel_settings',
      title: 'Access Control',
      desc: 'Strict access controls ensure only authorized personnel can access your information.',
    },
    {
      icon: 'cloud_done',
      title: 'Secure Storage',
      desc: 'Data is stored on secure AWS cloud infrastructure with regular backups and disaster recovery plans.',
    },
    {
      icon: 'cloud',
      title: 'AWS Infrastructure',
      desc: 'We use Amazon Web Services (AWS CloudFront and Elastic Beanstalk) for secure, reliable hosting with global content delivery.',
    },
    {
      icon: 'fact_check',
      title: 'Regular Audits',
      desc: 'We conduct regular security audits and vulnerability assessments.',
    },
  ];

  userRights: UserRight[] = [
    {
      title: 'Right to Access',
      desc: 'Request copies of your personal information held by us.',
    },
    {
      title: 'Right to Correction',
      desc: 'Request correction of inaccurate or incomplete information.',
    },
    {
      title: 'Right to Deletion',
      desc: 'Request deletion of your data, subject to legal retention requirements.',
    },
    {
      title: 'Right to Restriction',
      desc: 'Request restriction of processing your information in certain circumstances.',
    },
    {
      title: 'Right to Data Portability',
      desc: 'Request transfer of your data to another service provider.',
    },
    {
      title: 'Right to Object',
      desc: 'Object to processing of your information for specific purposes.',
    },
    {
      title: 'Right to Withdraw Consent',
      desc: 'Withdraw consent for data processing at any time.',
    },
  ];

  cookieInfo: CookieInfo[] = [
    {
      title: 'Current Cookie Usage',
      desc: 'AMKRTech uses Google AdSense to display advertisements on our website. This service uses cookies and similar technologies to show you relevant ads based on your browsing activity. Our financial calculators and tools operate entirely on client-side calculations without storing personal calculation data.',
      type: 'info',
    },
    {
      title: 'Google AdSense Cookies',
      desc: 'Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. Google\'s use of advertising cookies enables it and its partners to serve ads based on your visit to AMKRTech and/or other sites on the Internet. These cookies:',
      items: [
        'Personalize ad content based on your interests and browsing behavior',
        'Measure ad effectiveness and user engagement with advertisements',
        'Help prevent the same ads from being shown repeatedly',
        'Enable frequency capping (limiting how often you see specific ads)',
        'Track conversions and campaign performance for advertisers',
        'Provide aggregated reports to Google and advertisers',
      ],
      type: 'analytics',
    },
    {
      title: 'Technical Infrastructure Cookies',
      desc: 'Our hosting provider, Amazon Web Services (AWS), may use technical cookies through CloudFront CDN for:',
      items: [
        'Load balancing and performance optimization',
        'DDoS protection and security measures',
        'Session management (temporary, no personal data stored)',
        'Content delivery network (CDN) caching',
      ],
      type: 'info',
    },
    {
      title: 'Analytics & Tracking',
      desc: 'We use Google AdSense for advertising, and we may implement additional analytics tools through AWS services (such as CloudWatch RUM, Pinpoint) and/or third-party platforms (Google Analytics) to better understand user behavior and improve our services. We:',
      items: [
        'Display a clear cookie consent banner before collecting any analytics data',
        'Collect usage statistics: page views, session duration, feature usage, navigation patterns',
        'Track user interactions: button clicks, form submissions, calculator usage',
        'Gather device information: browser type, screen size, operating system',
        'Record geographic data: country, region, city-level location (not precise location)',
        'Monitor performance metrics: page load times, errors, API response times',
        'Only process anonymized or pseudonymized data where possible',
        'Provide clear opt-out mechanisms and honor Do Not Track signals',
        'Update this policy with specific tools and data collection practices',
      ],
      type: 'analytics',
    },
    {
      title: 'AWS Analytics Services',
      desc: 'We may use Amazon Web Services analytics and monitoring tools for:',
      items: [
        'Application Performance Monitoring (CloudWatch, X-Ray)',
        'User behavior analytics and engagement tracking',
        'Error logging and debugging (CloudWatch Logs)',
        'A/B testing and feature rollouts',
        'Marketing automation and user segmentation (if applicable)',
      ],
      type: 'analytics',
    },
    {
      title: 'Your Control & Consent',
      desc: 'You have full control over how cookies and ads work on our website. You can manage your preferences through:',
      items: [
        'Google Ad Settings: Visit https://www.google.com/settings/ads to customize ad preferences',
        'Opt-out of personalized advertising: Use https://www.aboutads.info/ or https://www.youronlinechoices.eu/',
        'Browser cookie settings: Block or delete cookies through your browser preferences',
        'Cookie consent banner: Manage your cookie preferences through our consent interface',
        'Do Not Track signals: We honor browser Do Not Track requests where applicable',
        'NAI opt-out: Visit http://optout.networkadvertising.org/ to opt out of interest-based advertising',
      ],
      type: 'manage',
    },
  ];

  ngOnInit(): void {
    // Initial scroll position check
    this.updateScrollPosition();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.updateScrollPosition();
  }

  updateScrollPosition(): void {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = (window.scrollY / totalHeight) * 100;

    // Update active section based on scroll position
    const sections = document.querySelectorAll('.policy-section');
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        this.activeSection = section.id;
      }
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = UI_CONSTANTS.SCROLL_OFFSET;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }

  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }
}
