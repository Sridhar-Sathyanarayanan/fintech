import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModules } from '../shared/material.standalone';

@Component({
  selector: 'app-calculator-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModules],
  templateUrl: './calculator-home.component.html',
  styleUrl: './calculator-home.component.scss',
})
export class CalculatorHomeComponent {}
