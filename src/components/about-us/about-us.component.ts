import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/ProductService';

@Component({
  selector: 'pet-paradise-client-about-us',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductService) { }

  ngOnInit(): void {
    this.getBrandList();
  }

  getBrandList() {
    this.productsService.getList().subscribe(
      (data) => {
        console.log('Brand List:', data);
        this.products = data;
      },
      (error) => {
        console.error('Error fetching brand list:', error);
      }
    );
  }
}
