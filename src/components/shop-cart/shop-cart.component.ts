import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {LabelInputAsideComponent} from "../public-components/input/label-input-aside.component";
import {ProductViewEditionComponent} from "./product-view-edition/product-view-edition.component";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {Product} from "../../models/product.model";
import {Purchase} from "../../models/purchase.model";
import {ProductService} from "../../services/products/product.service";
import {PurchaseService} from "../../services/purchases/purchase.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'pet-paradise-client-shop-cart',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, LabelInputAsideComponent, ProductViewEditionComponent, RouterOutlet, MatListModule, MatButtonToggleModule],
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent {
  customerId: string = '';
  totalPrice: string = '';
  isClicked = false;
  products: Product[] = [];
  customerProducts: Product[] = [];
  purchases: Purchase[] = [];
  customerPurchases: Purchase[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private purchaseService: PurchaseService,
  ) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.customerId = params['id'];

      forkJoin([this.getPurchasesList()]).subscribe(
        ([purchases]) => {
          this.purchases = purchases;
          forkJoin([this.filterByCustomerId(Number(this.customerId), this.purchases)]).subscribe(
            (filteredPurchases) => {
              this.customerPurchases = filteredPurchases;
              forkJoin([this.getProductsList()]).subscribe(
                ([products]) => {
                  this.products = products;
                  for (const purchase of purchases) {
                    const foundProduct = products.find((product) => product.productID === purchase.productID);
                    if (foundProduct) {
                      this.customerProducts.push(foundProduct);
                    }
                  }
                  this.getTotalPrice()
                }
              );
            }
          );
        }
      )
    });
  }

  onClick() {
    this.isClicked = !this.isClicked;
  }

  getProductsList() {
    return this.productService.getList();
  }


  getTotalPrice() {
    this.totalPrice = this.customerProducts.reduce((total, product) => total + product.price - (product.price * product.discount / 100), 0).toString();

  }

  getPurchasesList() {
    return this.purchaseService.getList()
  }


  filterByCustomerId(customerId: number, purchases: Purchase[]): Purchase[] {
    return purchases.filter(purchase => purchase.userID === customerId);
  }
}
