import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModules } from '../shared/material.standalone';
import { BannerSectionComponent, BannerVisualCard } from '../shared/components';
import { UI_CONSTANTS } from '../models/app.constants';

interface TOSSection {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModules, BannerSectionComponent],
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsComponent implements OnInit {
  termsFeatures = [
    {
      icon: 'gavel',
      label: 'Legally Binding',
    },
    {
      icon: 'verified_user',
      label: 'User Protection',
    },
    {
      icon: 'update',
      label: 'Regular Updates',
    },
  ];

  visualCards: BannerVisualCard[] = [
    {
      icon: 'description',
      label: 'Sections',
      value: '13+'
    },
    {
      icon: 'shield',
      label: 'Your Rights',
      value: 'Protected'
    },
    {
      icon: 'schedule',
      label: 'Last Updated',
      value: 'Dec 2025'
    }
  ];

  activeSection: string = '';
  scrollProgress: number = 0;
  lastUpdated: string = 'December 3, 2025';
  effectiveDate: string = 'December 3, 2025';

  tosSections: TOSSection[] = [
    { id: 'acceptance', title: 'Acceptance of Terms', icon: 'check_circle' },
    { id: 'description', title: 'Service Description', icon: 'description' },
    { id: 'user-accounts', title: 'User Accounts', icon: 'account_circle' },
    { id: 'user-responsibilities', title: 'User Responsibilities', icon: 'assignment' },
    { id: 'prohibited-uses', title: 'Prohibited Uses', icon: 'block' },
    { id: 'intellectual-property', title: 'Intellectual Property', icon: 'copyright' },
    { id: 'disclaimers', title: 'Disclaimers', icon: 'warning' },
    { id: 'limitation-liability', title: 'Limitation of Liability', icon: 'shield' },
    { id: 'indemnification', title: 'Indemnification', icon: 'security' },
    { id: 'modifications', title: 'Modifications to Service', icon: 'edit' },
    { id: 'termination', title: 'Termination', icon: 'cancel' },
    { id: 'governing-law', title: 'Governing Law', icon: 'gavel' },
    { id: 'contact', title: 'Contact Information', icon: 'contact_support' },
  ];

  ngOnInit(): void {
    this.updateScrollPosition();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.updateScrollPosition();
  }

  updateScrollPosition(): void {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = (window.scrollY / totalHeight) * 100;

    const sections = document.querySelectorAll('.tos-section');
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
