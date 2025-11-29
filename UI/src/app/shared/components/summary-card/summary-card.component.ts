import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModules } from '../../material.standalone';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule, MaterialModules],
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryCardComponent {
  @Input() icon?: string;
  @Input() title?: string;
  @Input() summary?: { label: string; value: string };
}
