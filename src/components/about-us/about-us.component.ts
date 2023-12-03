import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/products/product.service';
import { CommonService } from '../../services/shared/assets/common.service';

@Component({
  selector: 'pet-paradise-client-about-us',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.getBrandList();
  }

  getImagePath(imageName: string): string {
    return this.commonService.getImagePath(imageName);
  }

  getIconPath(iconName: string): string {
    return this.commonService.getIconPath(iconName);
  }

  getBrandList() {
    this.productsService.getList().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
      }
    );
  }
}
