import {Component, HostListener, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Product} from "../../../models/product.model";
import {ProductCardComponent} from "../../product-card/product-card.component";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-custom-carousel',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatIconModule],
  templateUrl: './custom-carousel.component.html',
  styleUrl: './custom-carousel.component.scss'
})
export class CustomCarouselComponent {
  @Input() products: Product[] = [];
  productsShuffled: Product[] = [];
  productsToShow: Product[] = [];
  itemsPerGroup = 4;
  currentIndex = 0;



  ngOnInit() {
    this.productsShuffled = this.products.slice()
    this.productsShuffled = this.shuffleProducts(this.productsShuffled);
    this.adjustAttributeBasedOnWindowSize();
    this.showData();
  }

  showMore() {
    if (this.currentIndex + this.itemsPerGroup < this.productsShuffled.length) {
      this.productsToShow = this.productsShuffled.slice(this.currentIndex + this.itemsPerGroup, this.currentIndex + this.itemsPerGroup * 2);
      if ((this.currentIndex + this.itemsPerGroup) < this.productsShuffled.length) {
        this.currentIndex = this.currentIndex + this.itemsPerGroup
      }
    }

  }

  showData() {
    this.productsToShow = this.productsShuffled.slice(this.currentIndex, this.itemsPerGroup);
  }

  showLess() {
    if (this.currentIndex - this.itemsPerGroup >= 0) {
      this.productsToShow = this.productsShuffled.slice(this.currentIndex - this.itemsPerGroup, this.currentIndex);
      if ((this.currentIndex - this.itemsPerGroup ) >= 0) {
        this.currentIndex -= this.itemsPerGroup;
      }
    }
  }


  resetShowData() {
    this.productsToShow = this.products.slice(0, this.itemsPerGroup);
    this.currentIndex = 0;
  }

  shuffleProducts(products: Product[]) {

    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];

    }
    console.log(products)
    return products;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustAttributeBasedOnWindowSize();
    this.resetShowData()
  }

  private adjustAttributeBasedOnWindowSize() {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 360) {
      this.itemsPerGroup = 2;
    } else {
      this.itemsPerGroup = 4
    }
  }
}
