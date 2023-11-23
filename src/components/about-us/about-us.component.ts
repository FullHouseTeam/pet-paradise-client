import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'pet-paradise-client-about-us',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe({
      next: (products) => {
        console.log(products);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
