import {Component, Input, OnInit, Output} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Product} from "../../../models/product.model";
import {PurchaseService} from "../../../services/purchases/purchase.service";
import {Purchase} from "../../../models/purchase.model";


@Component({
  selector: 'pet-paradise-client-product-view-edition',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, MatButtonModule, NgOptimizedImage, MatGridListModule, MatButtonToggleModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-view-edition.component.html',
  styleUrls: ['./product-view-edition.component.scss']
})
export class ProductViewEditionComponent implements OnInit{
  @Input() product: Product = {} as Product;
  @Input() purchase: Purchase = {} as Purchase;
  productQuantity: number = 0;
  productImage: string = '';
  productName: string = '';
  productPrice: number = 0;



  constructor(
    private purchaseService: PurchaseService
  ) {
  }
  ngOnInit(): void {
    this.productImage = this.product.image
    this.productName = this.product.name
    this.productPrice = this.product.price
  }

  updatePurchaseQuantity() {
    this.purchase.totalPrice = this.productQuantity
    this.purchaseService.update(this.purchase.purchaseID, this.purchase)
  }
  print() {
    console.log(this.purchase)
  }
}

