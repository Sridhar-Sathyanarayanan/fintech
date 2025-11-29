import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModules } from '../shared/material.standalone';
import { BannerSectionComponent } from '../shared/components';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    twitter?: string;
  };
}

interface Value {
  icon: string;
  title: string;
  description: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModules, BannerSectionComponent],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsComponent {
  bannerActions = [
    {
      label: 'Our Mission',
      icon: 'explore',
      route: '#mission',
      variant: 'primary' as const,
    },
    {
      label: 'Meet the Team',
      icon: 'groups',
      route: '#team',
      variant: 'secondary' as const,
    },
  ];

  bannerCards = [
    {
      icon: 'school',
      label: 'Financial Literacy',
      value: 'For Everyone',
    },
    {
      icon: 'security',
      label: 'Data Security',
      value: '100% Safe',
    },
  ];

  stats = [
    { value: '50K+', label: 'Active Users', icon: 'people' },
    { value: '100K+', label: 'Calculations Done', icon: 'calculate' },
    {
      value: '₹200Cr+',
      label: 'Money Managed',
      icon: 'account_balance_wallet',
    },
    { value: '4.9★', label: 'User Rating', icon: 'star' },
  ];

  values: Value[] = [
    {
      icon: 'lightbulb',
      title: 'Financial Literacy',
      description:
        'We believe everyone deserves access to financial education. Our tools simplify complex financial concepts, making wealth management accessible to all.',
    },
    {
      icon: 'verified_user',
      title: 'Trust & Transparency',
      description:
        'Your financial data is sacred. We maintain the highest standards of security and never share your information with third parties.',
    },
    {
      icon: 'trending_up',
      title: 'Empowerment',
      description:
        'We empower individuals to take control of their financial future through intelligent tools, accurate calculations, and actionable insights.',
    },
    {
      icon: 'psychology',
      title: 'Innovation',
      description:
        'Leveraging cutting-edge technology to create intuitive financial solutions that adapt to the evolving needs of modern families.',
    },
  ];

  features: Feature[] = [
    {
      icon: 'calculate',
      title: 'Tax Calculators',
      description:
        'Compare old vs new tax regimes, understand deductions, and optimize your tax planning with our comprehensive tax calculators.',
      color: 'primary',
    },
    {
      icon: 'trending_up',
      title: 'Investment Tools',
      description:
        'SIP calculators, PPF projections, and investment tracking tools help you plan your wealth creation journey systematically.',
      color: 'accent',
    },
    {
      icon: 'home_work',
      title: 'Loan Calculators',
      description:
        'Home loan EMI calculators, loan comparison tools, and amortization schedules to help you make informed borrowing decisions.',
      color: 'primary',
    },
    {
      icon: 'savings',
      title: 'Budget Planning',
      description:
        'Family budget planners and expense trackers that help you maintain financial discipline and achieve your savings goals.',
      color: 'accent',
    },
  ];

  milestones: Milestone[] = [
    {
      year: '2020',
      title: 'Foundation',
      description:
        'AMKRTech was founded with a vision to democratize financial planning for every Indian household.',
    },
    {
      year: '2021',
      title: 'Product Launch',
      description:
        'Launched our first suite of tax calculators, helping thousands navigate the new tax regime changes.',
    },
    {
      year: '2022',
      title: 'Expansion',
      description:
        'Added investment calculators and crossed 10,000 active users milestone with 4.8★ rating.',
    },
    {
      year: '2023',
      title: 'Recognition',
      description:
        'Featured in leading fintech publications and won "Best Financial Planning Tool" award.',
    },
    {
      year: '2024',
      title: 'Innovation',
      description:
        'Introduced AI-powered insights and personalized recommendations, managing ₹200Cr+ in user portfolios.',
    },
    {
      year: '2025',
      title: 'Growth',
      description:
        'Serving 50K+ users with comprehensive financial planning tools and educational resources.',
    },
  ];

  team: TeamMember[] = [
    {
      name: 'Amit Kumar',
      role: 'Founder & CEO',
      image: 'assets/images/team/ceo.jpg',
      bio: 'Former investment banker with 15+ years in fintech',
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Product',
      image: 'assets/images/team/product.jpg',
      bio: 'Product strategist passionate about financial inclusion',
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
    {
      name: 'Raj Malhotra',
      role: 'Lead Developer',
      image: 'assets/images/team/tech.jpg',
      bio: 'Full-stack engineer building scalable fintech solutions',
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
    {
      name: 'Sneha Patel',
      role: 'Financial Advisor',
      image: 'assets/images/team/advisor.jpg',
      bio: 'Certified financial planner with expertise in tax planning',
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
  ];

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
