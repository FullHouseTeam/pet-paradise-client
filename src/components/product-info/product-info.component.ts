import {Component, OnInit, Renderer2, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductService} from "../../services/products/product.service";
import { ProviderService } from "../../services/suppliers/provider.service";
import { Product} from "../../models/product.model";
import { BrandService } from "../../services/brands/brand.service";
import { Brand } from "../../models/brand.model";
import { forkJoin } from 'rxjs';
import { Provider } from "../../models/provider.model";
import { SharedService } from "../../services/globalAttributes/shared.service";
import { PurchaseService } from "../../services/purchases/purchase.service";
import { PurchaseDTO } from "../../modelsDTO/purchaseDTO.model";
import {Purchase} from "../../models/purchase.model";

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
  providerField: string = '';
  productType: string = '';
  image: string = '';
  discount: string = '';
  isClicked = false;
  productIds: string[] = [];
  products: Product[] = [];
  purchases: Purchase[] = [];
  brand: Brand = {} as Brand;
  product: Product = {} as Product;
  provider: Provider = {} as Provider;
  purchase: Purchase | undefined = {} as Purchase;
  purchaseDto: PurchaseDTO = {} as PurchaseDTO;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private sharedService: SharedService,
      private productService: ProductService,
      private brandService: BrandService,
      private providerService: ProviderService,
      private purchaseService: PurchaseService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      forkJoin([this.getProductsList(), this.getPurchaseList()]).subscribe(
          ([products, purchases]) => {
            this.products = products;
            this.purchases = purchases;
            this.filterPurchasesByID(purchases, Number(this.sharedService.getGlobalVariable()))
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
                    forkJoin([this.getBrand(Number(this.product.brandID)), this.getProvider(Number(this.product.providerID))]).subscribe(
                        ([brand, provider]) => {
                          this.brand = brand;
                          this.provider = provider;
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
    this.isClicked = this.isDuplicated(this.purchases, this.product.productID, Number(this.sharedService.getGlobalVariable()))
    this.title = this.truncateText(this.product.name, 20);
    this.brandName = this.truncateText(this.brand.name,18);
    this.price = (this.product.price.toString())
    this.description = this.product.description;
    this.animalCategory = this.product.animalCategory;
    this.providerField = this.truncateText(this.provider.name,18);
    this.productType = this.product.productType;
    this.discount = this.product.discount.toString();
    this.image = this.product.image || 'https://res.cloudinary.com/dkappxhfr/image/upload/v1701218817/Pet/noImage.webp';
  }

  onClick() {
    if(!this.isClicked) {
      if(!this.isDuplicated(this.purchases, this.product.productID, Number(this.sharedService.getGlobalVariable()))){
        this.purchaseDto = {
          totalPrice: 0,
          obtainedTaxes: 0,
          deliveryTime: 0,
          localQuantity: 1,
          productID: this.product.productID,
          userID: Number(this.sharedService.getGlobalVariable()),
          isAvailable: true
        }
        this.purchaseService.add(this.purchaseDto);
        this.isClicked = !this.isClicked;
      }
    } else {
      this.purchase = this.duplicatedObject(this.purchases, this.product.productID, Number(this.sharedService.getGlobalVariable()))
      this.purchaseDto = {
        totalPrice: 0,
        obtainedTaxes: 0,
        deliveryTime: 0,
        localQuantity: 1,
        productID: this.product.productID,
        userID: Number(this.sharedService.getGlobalVariable()),
        isAvailable: false
      }
      this.purchaseService.update(<number>this.purchase?.purchaseID, this.purchaseDto)
      this.isClicked = !this.isClicked;
    }





  }

  redirectToCategoriesAndProducts() {
    this.router.navigate(['/store/' + this.product.animalCategory]);
  }

  getProductsList() {
    return this.productService.getList();
  }

  getPurchaseList() {
    return this.purchaseService.getList();
  }

  getBrand(id: number) {
    return this.brandService.getById(id);
  }


  getProduct(id: number) {
    return this.productService.getById(id);
  }

  getProvider(id: number) {
    return this.providerService.getById(id);
  }

  private truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  filterPurchasesByID(purchases: Purchase[], id: number) {
    this.purchases = purchases.filter((purchase) => purchase.userID == id);
  }

  isDuplicated(purchases: Purchase[], productID: number, userID: number): boolean {
    return purchases.some((purchase) => purchase.productID === productID && purchase.userID === userID);
  }

  duplicatedObject(purchases: Purchase[], productID: number, userID: number): Purchase | undefined {
    return purchases.find((purchase) => purchase.productID === productID && purchase.userID === userID);
  }


}
