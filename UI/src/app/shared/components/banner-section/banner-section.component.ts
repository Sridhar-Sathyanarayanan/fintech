import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModules } from '../../material.standalone';

export interface BannerAction {
  label: string;
  icon: string;
  route: string;
  variant: 'primary' | 'secondary';
}

export interface BannerFeature {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-banner-section',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModules],
  templateUrl: './banner-section.component.html',
  styleUrls: ['./banner-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerSectionComponent {
  @Input() title!: string;
  @Input() gradientText!: string;
  @Input() subtitle!: string;
  @Input() badge?: string;
  @Input() badgeIcon?: string;
  @Input() actions: BannerAction[] = [];
  @Input() features: BannerFeature[] = [];
  @Input() visualCards?: Array<{ icon: string; label: string; value: string }>;
  @Input() illustration?: string;
}
