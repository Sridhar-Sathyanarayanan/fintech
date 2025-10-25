import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModules } from '../shared/material.standalone';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, MaterialModules],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent {}
