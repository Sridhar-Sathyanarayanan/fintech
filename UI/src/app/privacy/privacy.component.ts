import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModules } from '../shared/material.standalone';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, MaterialModules],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css',
})
export class PrivacyComponent {}
