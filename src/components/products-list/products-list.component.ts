import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/products/product.service';
import { CommonService } from '../../services/shared/assets/common.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.productService.getList().
    subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (response) => {
        console.log(response);
      }
      }
    )
  }

  getIconPath(iconName: string): string {
    return this.commonService.getIconPath(iconName);
  }
}
