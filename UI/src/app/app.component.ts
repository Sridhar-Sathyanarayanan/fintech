import { Component, inject, signal, ViewChild } from '@angular/core';
import { RouterOutlet, RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MaterialModules } from './shared/material.standalone';

interface NavItem {
  label: string;
  route?: string;
  icon: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    MaterialModules
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  private breakpointObserver = inject(BreakpointObserver);
  
  title = 'tax-calculator';
  isMobile = signal(false);
  isScrolled = signal(false);

  navItems: NavItem[] = [
    {
      label: 'Home',
      route: '/',
      icon: 'home'
    },
    {
      label: 'Calculators',
      icon: 'calculate',
      children: [
        {
          label: 'Income Tax Calculator',
          route: '/income-tax-calculator',
          icon: 'account_balance_wallet'
        },
        {
          label: 'SIP Calculator',
          route: '/sip-calculator',
          icon: 'trending_up'
        },
        {
          label: 'PPF Calculator',
          route: '/ppf-calculator',
          icon: 'savings'
        },
        {
          label: 'Home Loan Calculator',
          route: '/home-loan-calculator',
          icon: 'home_work'
        }
      ]
    },
    {
      label: 'Tax Slabs',
      route: '/tax-slabs',
      icon: 'receipt_long'
    },
    {
      label: 'Privacy',
      route: '/privacy-policy',
      icon: 'privacy_tip'
    },
    {
      label: 'About Us',
      route: '/about-us',
      icon: 'info'
    },
    {
      label: 'Contact',
      route: '/contact',
      icon: 'contact_mail'
    }
  ];

  constructor() {
    // Monitor screen size
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe(result => {
        this.isMobile.set(result.matches);
      });

    // Monitor scroll position
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 50);
      });
    }
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  closeSidenav(): void {
    if (this.isMobile()) {
      this.sidenav.close();
    }
  }
}