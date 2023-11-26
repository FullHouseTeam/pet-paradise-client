import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pet-paradise-client-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'pet-paradise-client-home';
}
