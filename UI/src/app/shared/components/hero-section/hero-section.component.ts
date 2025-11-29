import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModules } from '../../material.standalone';

export interface HeroAction {
  label: string;
  icon: string;
  route: string;
  variant: 'primary' | 'secondary';
}

export interface HeroFeature {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModules],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {
  @Input() title!: string;
  @Input() gradientText!: string;
  @Input() subtitle!: string;
  @Input() badge?: string;
  @Input() badgeIcon?: string;
  @Input() actions: HeroAction[] = [];
  @Input() features: HeroFeature[] = [];
  @Input() visualCards?: Array<{ icon: string; label: string; value: string }>;
  @Input() illustration?: string;
}
