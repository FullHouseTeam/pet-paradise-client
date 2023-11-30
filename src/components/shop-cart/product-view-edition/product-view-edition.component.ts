import {Component, Input, OnInit, Output} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Product} from "../../../models/product.model";
import {PurchaseService} from "../../../services/purchases/purchase.service";
import {Purchase} from "../../../models/purchase.model";
import {PurchaseAble} from "../../../services/purchases/PurchaseAble.model";
import {ProductService} from "../../../services/products/product.service";
import {forkJoin, min} from "rxjs";


@Component({
  selector: 'pet-paradise-client-product-view-edition',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, MatButtonModule, NgOptimizedImage, MatGridListModule, MatButtonToggleModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-view-edition.component.html',
  styleUrls: ['./product-view-edition.component.scss']
})
export class ProductViewEditionComponent implements OnInit{
  @Input() purchase: Purchase = {} as Purchase;
  product: Product = {} as Product;
  productQuantity = new FormControl();
  productImage: string = '';
  productName: string = '';
  productPrice: number = 0;

  purchasePut_able: PurchaseAble = {} as PurchaseAble;



  constructor(
    private purchaseService: PurchaseService,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.getProductById(this.purchase.productID).subscribe(
      (product: Product) => {
        this.product = product;
        this.productImage = product.image;
        this.productName = product.name;
        this.productPrice = product.price;
      }
    );
  }

  quantityValidation() {
    this.productQuantity.setValidators([Validators.required, Validators.max(this.product.quantity), Validators.min(1)])

    if (this.productQuantity.hasError('required')) {
      return 'fill it';
    }
    if (this.productQuantity.hasError('max') || this.productQuantity.hasError('min')) {
      return '1-' + this.product.quantity.toString()
    }

    return '';
  }

  updatePurchaseQuantity() {
    if(this.productQuantity.valid) {
      /*
      this.purchasePut_able.totalPrice = this.purchase.totalPrice
      this.purchasePut_able.obtainedTaxes = this.purchase.obtainedTaxes
      this.purchasePut_able.deliveryTime = this.purchase.deliveryTime
      this.purchasePut_able.localQuantity = Number(this.productQuantity.value)
      this.purchasePut_able.productID = this.purchase.productID
      this.purchasePut_able.userID = this.purchase.userID
      this.purchasePut_able.isAvailable = Boolean(this.purchase.isAvailable)
      */

      this.purchasePut_able.totalPrice = 20
      this.purchasePut_able.obtainedTaxes = 20
      this.purchasePut_able.deliveryTime = 20
      this.purchasePut_able.localQuantity = 20
      this.purchasePut_able.productID = 1
      this.purchasePut_able.userID = 4
      this.purchasePut_able.isAvailable = true

      console.log(this.purchasePut_able)
      this.purchaseService.update(this.purchase.purchaseID, this.purchasePut_able)
    }

  }
  print() {
    this.purchaseService.update(this.purchase.purchaseID, this.purchasePut_able);
    console.log(this.purchase)
  }

  getProductById(productId: number) {
    return this.productService.getById(productId)
  }
}

