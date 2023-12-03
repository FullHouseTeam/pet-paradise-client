import { Component, HostListener, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {Product} from "../../../models/product.model";
import { CommonModule } from '@angular/common';
import {ProductCardComponent} from "../../product-card/product-card.component";
import {MatIconModule} from "@angular/material/icon";



@Component({
  selector: 'app-custom-carousel',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatIconModule],
  templateUrl: './custom-carousel.component.html',
  styleUrls: ['./custom-carousel.component.scss']
})
export class CustomCarouselComponent implements OnInit, OnChanges {
  @Input() products: Product[] = [];
  productsShuffled: Product[] = [];
  productsToShow: Product[] = [];
  itemsPerGroup = 4;
  currentIndex = 0;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.resetCarousel();
      }
    });
  }

  ngOnInit() {
    this.resetCarousel();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products'] && !changes['products'].firstChange) {
      this.resetCarousel();
    }
  }


  resetCarousel() {
    this.productsShuffled = this.shuffleProducts(this.products.slice());
    this.adjustAttributeBasedOnWindowSize();
    this.resetShowData();
  }

  showMore() {
    if (this.currentIndex + this.itemsPerGroup < this.productsShuffled.length) {
      this.productsToShow = this.productsShuffled.slice(
        this.currentIndex + this.itemsPerGroup,
        this.currentIndex + this.itemsPerGroup * 2
      );
      if (this.currentIndex + this.itemsPerGroup < this.productsShuffled.length) {
        this.currentIndex = this.currentIndex + this.itemsPerGroup;
      }
    }
  }

  showData() {
    this.productsToShow = this.productsShuffled.slice(this.currentIndex, this.currentIndex + this.itemsPerGroup);
  }

  showLess() {
    if (this.currentIndex - this.itemsPerGroup >= 0) {
      this.productsToShow = this.productsShuffled.slice(
        this.currentIndex - this.itemsPerGroup,
        this.currentIndex
      );
      if (this.currentIndex - this.itemsPerGroup >= 0) {
        this.currentIndex -= this.itemsPerGroup;
      }
    }
  }

  resetShowData() {
    this.productsToShow = this.productsShuffled.slice(0, this.itemsPerGroup);
    this.currentIndex = 0;
  }


  shuffleProducts(products: Product[]) {
    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }
    return products;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustAttributeBasedOnWindowSize();
    this.resetShowData();
  }

  private adjustAttributeBasedOnWindowSize() {
    const windowWidth = window.innerWidth;
    this.itemsPerGroup = windowWidth <= 360 ? 2 : 4;
  }
}
