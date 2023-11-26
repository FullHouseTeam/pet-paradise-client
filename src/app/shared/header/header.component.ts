import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'pet-paradise-client-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  panelOpenState: boolean = false

  constructor(private router: Router) {}

  redirectToCategoriesAndProducts() {
    this.router.navigate(['/categories-and-products']);
  }
  redirectToAboutUs() {
    this.router.navigate(['/about-us']);
  }
  redirectToCustomer() {
    this.router.navigate(['/customer']);
  }
  redirectToShopCart() {
    this.router.navigate(['/shop-cart']);
  }
  redirectToHome() {
    this.router.navigate(['/']);
  }
}
