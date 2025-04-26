import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone:false,
  templateUrl: './app.component.html',
  template: ` <router-outlet></router-outlet> `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tax-calculator';
  isSmallScreen = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }
}
