import { Component, Input, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { ProductService } from "../../services/products/product.service";
import { Product } from "../../models/product.model";

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() productId: string = '';
  title = '';
  price = '';
  image = '';
  isClicked = false;
  product: Product = {} as Product;

  constructor(
      private renderer: Renderer2,
      private el: ElementRef,
      private router: Router,
      private route: ActivatedRoute,
      private productService: ProductService
  ) {}


  ngOnInit() {
    forkJoin([this.getProduct(Number(this.productId))]).subscribe(
        ([product]) => {
          this.product = product;
          this.loadProductDetails();
        }
    );
  }

  private loadProductDetails() {
    this.title = this.truncateText(this.product.name, 10);
    this.price = this.product.price.toString();
    this.image = this.product.image;
  }

  onClick() {
    this.isClicked = !this.isClicked;

    const buttonElement = this.el.nativeElement.querySelector('.add-button');

    if (this.isClicked) {
      this.renderer.setStyle(buttonElement, 'background-color', 'red');
      this.renderer.setProperty(buttonElement, 'innerText', 'Remove from Cart');
    } else {
      this.renderer.setStyle(buttonElement, 'background-color', '#3F51B5');
      this.renderer.setProperty(buttonElement, 'innerText', 'Add to Cart');
    }
  }
  goToProduct() {
    window.location.replace('/product/' + this.productId);

  }

  getProduct(id: number) {
    return this.productService.getById(id);
  }

  private truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

}
