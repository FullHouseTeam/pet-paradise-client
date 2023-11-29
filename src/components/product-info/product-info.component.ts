import {Component, OnInit, Renderer2, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductService} from "../../services/products/product.service";
import { Product} from "../../models/product.model";
import {BrandService} from "../../services/brands/brand.service";
import {Brand} from "../../models/brand.model";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss'
})
export class ProductInfoComponent implements OnInit {
  productId: string = '';
  title: string = '';
  price: string = '';
  description: string = '';
  brandName: string = '';
  animalCategory: string = '';
  provider: string = '';
  productType: string = '';
  image: string = '';
  discount: string = '';
  isClicked = false;
  productIds: string[] = [];
  products: Product[] = [];
  brand: Brand = {} as Brand;
  product: Product = {} as Product;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private productService: ProductService,
      private brandService: BrandService
  ) {
  }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      forkJoin([this.getProductsList()]).subscribe(
          ([products]) => {
        this.products = products;
          if (Number(this.productId) > this.products.length) {
            this.router.navigate(['/error']);
          } else {
            const maxIds = Math.min(this.products.length, 5);
            for (let i = 0; i < maxIds; i++) {
              const randomProductId = Math.floor(Math.random() * this.products.length) + 1;
              this.productIds.push(randomProductId.toString());
            }
            forkJoin([this.getProduct(Number(this.productId))]).subscribe(
                ([product]) => {
                  this.product = product;
                  forkJoin([this.getBrand(Number(this.product.brandID))]).subscribe(
                      ([brand]) => {
                        this.brand = brand;
                        this.loadProductDetails();
                      }
                  );
                }
            )
          }
        }
      )
    });
  }

  private loadProductDetails() {
    this.title = this.product.name;
    this.brandName = this.brand.name;
    this.price = this.product.price.toString()
    this.description = this.product.description;
    this.animalCategory = this.product.animalCategory;
    this.provider = 'Purina';
    this.productType = this.product.productType;
    this.discount = this.product.discount.toString();
    this.image = this.product.image || 'https://res.cloudinary.com/dkappxhfr/image/upload/v1701218817/Pet/noImage.webp';
  }
  onClick() {
    this.isClicked = !this.isClicked;
  }

  redirectToCategoriesAndProducts() {
    this.router.navigate(['/categories-and-products']);
  }

  getProductsList() {
    return this.productService.getList();
  }

  getBrand(id: number) {
    return this.brandService.getById(id);
  }

  getProduct(id: number) {
    return this.productService.getById(id);
  }
}

