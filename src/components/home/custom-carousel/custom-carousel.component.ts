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
  productsToShow: Product[] = [];
  itemsPerGroup = 4;
  currentIndex = 0;



  ngOnInit() {
    this.adjustAttributeBasedOnWindowSize();
    this.showData();
  }

  showMore() {
    if (this.currentIndex + this.itemsPerGroup < this.products.length) {
      this.productsToShow = this.products.slice(this.currentIndex + this.itemsPerGroup, this.currentIndex + this.itemsPerGroup * 2);
      if ((this.currentIndex + this.itemsPerGroup) < this.products.length) {
        this.currentIndex = this.currentIndex + this.itemsPerGroup
      }
    }

  }

  showData() {
      this.productsToShow = this.products.slice(this.currentIndex, this.itemsPerGroup);
  }

  showLess() {
    if (this.currentIndex - this.itemsPerGroup >= 0) {
      this.productsToShow = this.products.slice(this.currentIndex - this.itemsPerGroup, this.currentIndex);
      if ((this.currentIndex - this.itemsPerGroup ) >= 0) {
        this.currentIndex -= this.itemsPerGroup;
      }
    }
  }


  resetShowData() {
    this.productsToShow = this.products.slice(0, this.itemsPerGroup);
    this.currentIndex = 0;
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
