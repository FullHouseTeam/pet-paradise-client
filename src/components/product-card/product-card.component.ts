import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { ProductService } from "../../services/products/product.service";
import { Product } from "../../models/product.model";
import {NgClass} from "@angular/common";
import {Purchase} from "../../models/purchase.model";
import { SharedService } from "../../services/globalAttributes/shared.service";
import { PurchaseService} from "../../services/purchases/purchase.service";
import {PurchaseDTO} from "../../modelsDTO/purchaseDTO.model";

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  imports: [NgClass],
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {
  @Input() productId: string = '';
  title = '';
  price = '';
  image = '';
  isClicked = false;
  product: Product = {} as Product;
  discount: number = 0;
  purchases: Purchase[] = [];
  purchaseDto: PurchaseDTO = {} as PurchaseDTO;
  purchase: Purchase | undefined = {} as Purchase;

  constructor(
      private router: Router,
      private sharedService: SharedService,
      private productService: ProductService,
      private purchaseService: PurchaseService,
  ) {}

  ngOnInit() {
    forkJoin([this.getProduct(Number(this.productId)), this.getPurchaseList()]).subscribe(
        ([product, purchases]) => {
          this.product = product;
          this.purchases = purchases;
          this.loadProductDetails();
        }
    );
  }

  private loadProductDetails() {
    this.isClicked = this.isDuplicated(this.purchases, this.product.productID, Number(this.sharedService.getGlobalVariable()))
    this.title = this.truncateText(this.product.name, 10);
    this.discount = this.product.discount;
    if (this.discount > 0) {
      const discountedPrice = this.product.price - (this.product.price * (this.discount / 100));
      this.price = discountedPrice.toString();
    } else {
      this.price = this.product.price.toString();
    }    this.image = this.product.image;
  }

  onClick() {
    if(!this.isClicked) {
      if(!this.isDuplicated(this.purchases, this.product.productID, Number(this.sharedService.getGlobalVariable()))){
        this.purchaseDto = {
          totalPrice: 1,
          obtainedTaxes: 1,
          deliveryTime: 1,
          localQuantity: 1,
          productID: this.product.productID,
          userID: Number(this.sharedService.getGlobalVariable()),
          isAvailable: true
        }
        this.purchaseService.add(this.purchaseDto).subscribe(
            (error) => this.handleEditError(error)
        );

      } else {
        if(this.existFalse(this.purchases, this.product.productID, Number(this.sharedService.getGlobalVariable()))){
          this.purchaseDto = {
            totalPrice: 1,
            obtainedTaxes: 1,
            deliveryTime: 1,
            localQuantity: 1,
            productID: this.product.productID,
            userID: Number(this.sharedService.getGlobalVariable()),
            isAvailable: true,
          };
          this.purchaseService.update(<number>this.purchase?.purchaseID, this.purchaseDto).subscribe(
              (error) => this.handleEditError(error)
          );
        }
      }
      this.isClicked = !this.isClicked;


    } else {
      this.purchase = this.duplicatedObject(this.purchases, this.product.productID, Number(this.sharedService.getGlobalVariable()))
      const newPurchase: PurchaseDTO = {
        totalPrice: 1,
        obtainedTaxes: 1,
        deliveryTime: 1,
        localQuantity: 1,
        productID: this.product.productID,
        userID: Number(this.sharedService.getGlobalVariable()),
        isAvailable: false,
      };
      this.purchaseService.update(<number>this.purchase?.purchaseID, newPurchase).subscribe(
          (error) => this.handleEditError(error)
      );
      this.isClicked = !this.isClicked;
    }
  }

  goToProduct() {
    this.router.navigate(['/product/' + this.productId])
  }

  getProduct(id: number) {
    return this.productService.getById(id);
  }

  private truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }
  isDuplicated(purchases: Purchase[], productID: number, userID: number): boolean {
    return purchases.some((purchase) => purchase.productID === productID && purchase.userID === userID);
  }
  getPurchaseList() {
    return this.purchaseService.getList();
  }
  duplicatedObject(purchases: Purchase[], productID: number, userID: number): Purchase | undefined {
    return purchases.find((purchase) => purchase.productID === productID && purchase.userID === userID);
  }
  private handleEditError(error: any) {
    console.error('Error editing purchase:', error);
  }

  existFalse (purchases: Purchase[], productID: number, userID: number): boolean {
    return purchases.some((purchase) =>
        purchase.productID === productID &&
        purchase.userID === userID &&
        purchase.isAvailable === "false"
    );
  }
}
