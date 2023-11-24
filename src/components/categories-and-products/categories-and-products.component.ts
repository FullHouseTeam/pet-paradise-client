import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductCardComponent} from "../product-card/product-card.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {CdkFixedSizeVirtualScroll} from "@angular/cdk/scrolling";
import {Product} from "../../models/Product";
import {ProductService} from "../../services/ProductService";
import {Router} from "@angular/router";

@Component({
  selector: 'pet-paradise-client-categories-and-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatButtonToggleModule, MatButtonModule, MatInputModule, MatSelectModule, CdkFixedSizeVirtualScroll],
  templateUrl: './categories-and-products.component.html',
  styleUrls: ['./categories-and-products.component.scss']
})
export class CategoriesAndProductsComponent {
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
