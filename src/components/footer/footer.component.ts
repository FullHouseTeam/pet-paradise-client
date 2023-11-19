import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'pet-paradise-client-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private router: Router) {}

  redirectToSupport() {
    this.router.navigate(['/support']);
  }
  redirectToTermsAndConditions() {
    this.router.navigate(['/terms-and-conditions']);
  }

  redirectToFacebook() {
    window.location.replace('https://www.facebook.com');
  }

  redirectToWikipedia() {
    window.location.replace('https://en.wikipedia.org/wiki/Main_Page');
  }
}
