import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categoriess-container',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './categoriess-container.component.html',
  styleUrl: './categoriess-container.component.scss'
})
export class CategoriessContainerComponent {

  constructor(private router: Router) {
  }
  redirectToDogsCategory() {
    this.router.navigate(['/categories-and-products/dog']);
  }

  redirectToCatsCategory() {
    this.router.navigate(['/categories-and-products/cat']);
  }
  redirectToParrotCategory() {
    this.router.navigate(['/categories-and-products/parrot']);
  }
  redirectToRodentCategory() {
    this.router.navigate(['/categories-and-products/rodent']);
  }
  redirectToReptileCategories() {
    this.router.navigate(['/categories-and-products/reptile']);
  }
  redirectToFishCategory() {
    this.router.navigate(['/categories-and-products/fish']);
  }
}
