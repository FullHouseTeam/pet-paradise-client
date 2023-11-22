import {Component, OnInit, Renderer2, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductService} from "../../services/products/product.service";
import { Product} from "../../models/product.model";
import {BrandService} from "../../services/brands/brand.service";
import {Brand} from "../../models/brand.model";

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
  brand: string = '';
  animalCategory: string = '';
  provider: string = '';
  productType: string = '';
  image: string = '';
  isClicked = false;
  productIds: string[] = ['1', '2', '1', '3', '1'];
  product: Product[] = [];
  brands: Brand[] = [];

  constructor(
      private renderer: Renderer2,
      private el: ElementRef,
      private route: ActivatedRoute,
      private router: Router,
      private productService: ProductService,
      private brandService: BrandService
      ) {}


  ngOnInit() {
    this.getProductsList();
    this.getBrand();
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.loadProductDetails();
    });
  }

  private loadProductDetails() {

    //this.title = this.product[Number(this.productId)].productType;

    this.price = this.product.length > 0 ? this.product[Number(this.productId)].price.toString() : '0';

    this.description = this.product.length > 0 ? this.product[Number(this.productId)].description : '';

    this.brand = this.product.length > 0  ? this.brands[Number(this.product[Number(this.productId)].brandID)].name : 'No description';

    this.animalCategory = this.product.length > 0 ? this.product[Number(this.productId)].animalCategory : 'No Category';

    this.provider = 'Purina';
    //this.productType = this.product.length > 0 ? this.product[Number(this.productId)].productType : ''
    switch (this.productId) {
      case '1':
        this.image = 'https://www.agrovetmanantial.com/assets/images/productos-veterinaria/plato-perro.webp';
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
  onClick() {
    this.isClicked = !this.isClicked;
  }

  redirectToCategoriesAndProducts() {
    this.router.navigate(['/categories-and-products']);
  }

  getProductsList() {
    this.productService.getList().subscribe(
        (data) => {
          this.product = data;
        }
    );
  }

  getBrand() {
  this.brandService.getById(1).subscribe(
        (data) => {
          this.brands = [data];
        }
    );

  }

}
