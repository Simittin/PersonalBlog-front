import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footbar',
  imports: [],
  templateUrl: './footbar.component.html',
  styleUrl: './footbar.component.scss',
  standalone: true,
})
export class FootbarComponent {
currentYear: number = new Date().getFullYear();
}
