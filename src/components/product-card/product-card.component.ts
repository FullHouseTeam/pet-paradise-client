import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() productId: string = '';
  @Input() buttonText: string = 'Add to Cart';
  @Input() buttonColor: string = '';
  @Input() buttonTextColor: string = '';
  title = '';
  price = '';
  image = '';

  ngOnInit() {
    this.loadProductDetails();
  }

  private loadProductDetails() {

    switch (this.productId) {
      case '1':
        this.title = 'Product 1';
        this.price = '500000.00 $';
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
}
