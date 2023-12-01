import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesContainerComponent} from "../categories-container/categories-container.component";
import {ProductCardComponent} from "../product-card/product-card.component";
import {CustomCarouselComponent} from "./custom-carousel/custom-carousel.component";
import {ProductService} from "../../services/products/product.service";
import {Product} from "../../models/product.model";
import {forkJoin} from "rxjs";

@Component({
  selector: 'pet-paradise-client-home',
  standalone: true,
  imports: [CommonModule, CategoriesContainerComponent, ProductCardComponent, CustomCarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  products: Product[] = []

  constructor(
    private productService: ProductService
  ) {
  }
  ngOnInit(): void {
    forkJoin([this.getProducts()]).subscribe(
      ([products]) => {
        this.products = products
      })
  }

  getProducts() {
    return this.productService.getList()
  }
}
