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
import {ProductService} from "../../../services/products/product.service";
import { Router } from "@angular/router";
import {PurchaseDTO} from "../../../modelsDTO/purchaseDTO.model";


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

  purchaseToPost: PurchaseDTO = {} as PurchaseDTO;



  constructor(
    private purchaseService: PurchaseService,
    private productService: ProductService,
    private router: Router
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
    const idPurchase = this.purchase.purchaseID;
    this.purchaseService.getById(idPurchase).subscribe(
      (purchase) => this.editLocalQuantity(purchase, idPurchase, Number(this.productQuantity.value)),
      (error) => this.handleEditError(error)
    );

  }


  private editLocalQuantity(purchase: Purchase, idPurchase: number, newLocalQuantity: number) {
    if (purchase) {
      const updatedPurchaseDTO: PurchaseDTO = {
        totalPrice: purchase.totalPrice,
        obtainedTaxes: purchase.obtainedTaxes,
        deliveryTime: purchase.deliveryTime,
        localQuantity: Number(newLocalQuantity),
        productID: purchase.productID,
        userID: purchase.userID,
        isAvailable: Boolean(purchase.isAvailable),
      };

      this.purchaseService.update(idPurchase, updatedPurchaseDTO).subscribe(
        (response) => {
          console.log('Purchase after edition:', response);
        },
        (error) => this.handleEditError(error)
      );
    }
  }

  private editAvailability(purchase: Purchase, idPurchase: number, newAvailable: boolean) {
    if (purchase) {
      const updatedPurchaseDTO: PurchaseDTO = {
        totalPrice: purchase.totalPrice,
        obtainedTaxes: purchase.obtainedTaxes,
        deliveryTime: purchase.deliveryTime,
        localQuantity: purchase.localQuantity,
        productID: purchase.productID,
        userID: purchase.userID,
        isAvailable: newAvailable,
      };

      this.purchaseService.update(idPurchase, updatedPurchaseDTO).subscribe(
        (response) => {
          console.log('Purchase after edition:', response);
        },
        (error) => this.handleEditError(error)
      );
    }
  }

  private handleEditError(error: any) {
    console.error('Error editing purchase:', error);
  }



  updatePurchaseAvailability() {
    const idPurchase = this.purchase.purchaseID;
    this.purchaseService.getById(idPurchase).subscribe(
      (purchase) => this.editAvailability(purchase, idPurchase, false),
      (error) => this.handleEditError(error)
    );
    this.router.navigate([`/shop-cart/1`]);
  }


  getProductById(productId: number) {
    return this.productService.getById(productId)
  }
}

