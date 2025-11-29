import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModules } from '../../material.standalone';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, MaterialModules],
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatCardComponent {
  @Input() value?: string;
  @Input() label?: string;
  @Input() icon?: string;
}
