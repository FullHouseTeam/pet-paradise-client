import { Component, Input, OnInit, Renderer2, ElementRef } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router, private route: ActivatedRoute) {}


  ngOnInit() {
    this.loadProductDetails();
  }

  private loadProductDetails() {
    switch (this.productId) {
      case '1':
        this.title = 'Product 1';
        this.price = '15.00 $';
        this.image = '/assets/feeder.jpg';
        break;
      case '2':
        this.title = 'Product 2';
        this.price = '544.90 $';
        this.image = '/assets/feeder2.jpg';
        break;
      case '3':
        this.title = 'Product 3';
        this.price = '4571.15 $';
        this.image = '/assets/feeder3.jpg';
        break;
      default:
        this.title = 'default';
        this.price = '0.00 $';
        this.image = '/assets/feeder.jpg';
        break;
    }
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
    this.router.navigate(['/product', this.productId], { relativeTo: this.route });
  }

}
