import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MaterialModules } from '../../material.standalone';
import { SelectOption } from '../../../models/ui.models';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModules],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent {
  @Input() label!: string;
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'date' | 'textarea' | 'select' = 'text';
  @Input() placeholder?: string;
  @Input() hint?: string;
  @Input() control!: FormControl;
  @Input() errorMessage?: string;
  @Input() variant: 'fill' | 'outline' = 'outline';
  @Input() options?: SelectOption[];
  @Input() rows: number = 4;
  @Input() min?: number;
  @Input() max?: number;
  @Input() step?: number;
  @Output() valueChange = new EventEmitter<string | number | boolean>();
}
