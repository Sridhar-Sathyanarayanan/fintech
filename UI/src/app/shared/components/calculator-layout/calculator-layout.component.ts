import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModules } from '../../material.standalone';

@Component({
  selector: 'app-calculator-layout',
  standalone: true,
  imports: [CommonModule, MaterialModules],
  templateUrl: './calculator-layout.component.html',
  styleUrls: ['./calculator-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorLayoutComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
}
