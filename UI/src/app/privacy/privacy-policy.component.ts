import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModules } from '../shared/material.standalone';
import { BannerSectionComponent } from '../shared/components';

interface PolicySection {
  id: string;
  title: string;
  icon: string;
}

interface InfoCategory {
  title: string;
  items: string[];
}

interface UsageItem {
  title: string;
  desc: string;
}

interface SecurityFeature {
  icon: string;
  title: string;
  desc: string;
}

interface UserRight {
  title: string;
  desc: string;
}

interface CookieInfo {
  title: string;
  desc: string;
  items?: string[];
  type: 'info' | 'analytics' | 'manage';
}

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModules, BannerSectionComponent],
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
  lastUpdated: string = 'October 27, 2025';

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
    { id: 'your-rights', title: 'Your Rights', icon: 'verified_user' },
    { id: 'cookies', title: 'Cookies & Analytics', icon: 'cookie' },
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
      desc: 'Data is stored on secure servers with regular backups and disaster recovery plans.',
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
      title: 'What Are Cookies?',
      desc: 'Cookies are small text files stored on your device that help us recognize you and remember your preferences. They enable essential website functionality and help us improve our services.',
      type: 'info',
    },
    {
      title: 'Analytics Tools',
      desc: 'We use analytics tools to collect information about how visitors use our website. This helps us improve user experience and service quality. Information collected includes:',
      items: [
        'Page views and navigation patterns',
        'Time spent on pages',
        'Device and browser information',
        'Geographic location (country/city level)',
      ],
      type: 'analytics',
    },
    {
      title: 'Managing Cookies',
      desc: 'You can control and manage cookies through your browser settings. However, disabling cookies may affect the functionality of our website. Most browsers allow you to refuse cookies or delete existing cookies.',
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
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }

  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }
}
