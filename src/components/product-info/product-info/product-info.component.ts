import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import { ProductCardComponent } from "../../product-card/product-card/product-card.component";

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss'
})
export class ProductInfoComponent implements OnInit {
  productId = String;
  title = String;
  price = String;
  description = String;
  brand = String;
  animalCategory = String;
  provider = String;
  productType = String;
  image = String;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.loadProductDetails();
    });
  }

  private loadProductDetails() {
    this.title = 'Black dog feeder ';
    this.price = '35.99$';
    this.description = 'This pink dog feeder is the perfect way to add a touch of style to your cat\'s feeding area. ' +
        'The feeder is made of durable plastic and is dishwasher safe for easy cleaning. It has a large capacity to ' +
        'hold enough food for your cat for several days.';
    this.brand = 'Dog Chow';
    this.animalCategory = 'Dogs';
    this.provider = 'Purina';
    this.productType = 'Feeder';
    switch (this.productId) {
      case '1':
        this.image = '/assets/feeder.jpg';
        break;
      case '2':
        this.image = '/assets/feeder2.jpg';
        break;
      case '3':
        this.image = '/assets/feeder3.jpg';
        break;
      default:
        this.image = '/assets/feeder.jpg';
        break;
    }
  }
}
