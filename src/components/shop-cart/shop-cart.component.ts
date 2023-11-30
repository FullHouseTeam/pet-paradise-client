import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {LabelInputAsideComponent} from "./input/label-input-aside.component";
import {ProductViewEditionComponent} from "./product-view-edition/product-view-edition.component";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {Product} from "../../models/product.model";
import {Purchase} from "../../models/purchase.model";
import {ProductService} from "../../services/products/product.service";
import {PurchaseService} from "../../services/purchases/purchase.service";
import {forkJoin} from "rxjs";
import {SaleService} from "../../services/sales/sale.service";
import {Sale} from "../../models/sales.model";

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
  productForUpdate: Product = {} as Product;
  productForTotalPrice: Product = {} as Product;
  customerProducts: Product[] = [];
  purchases: Purchase[] = [];
  customerPurchases: Purchase[] = [];
  sales: Sale[] = [];
  zipCode: string = '';
  cardNumber: string = '';
  email: string = '';
  nit: string = '';
  cvv: string = '';
  month: string = '';
  year: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private purchaseService: PurchaseService,
    private saleService: SaleService
  ) {
  }



  showData() {
    console.log(this.zipCode,
      this.cvv,
      this.nit,
      this.cardNumber,
      this.month,
      this.year,
      this.email)
  }
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.customerId = params['id'];

      forkJoin([this.getPurchasesList(), this.getSalesList()]).subscribe(
        ([purchases, sales]) => {
          this.purchases = purchases;
          this.sales = sales;
          forkJoin([this.filterPurchasesByCustomerId(Number(this.customerId), this.purchases)]).subscribe(
            (filteredPurchases) => {
              this.customerPurchases = filteredPurchases;
              forkJoin([this.getProductsList()]).subscribe(
                ([products]) => {
                  this.products = products;
                  for (const purchase of purchases) {
                    let foundProduct = products.find((product) => product.productID === purchase.productID);
                    if (foundProduct) {
                      this.customerProducts.push(foundProduct);
                    }
                    foundProduct = undefined;
                  }
                }
              );
            }
          );
        }
      )
    });
  }


  getProductsList() {
    return this.productService.getList();
  }

  getSalesList() {
    return this.saleService.getList();
  }

  getTotalPrice() {
    this.totalPrice = '0';
    for (let purchase of this.customerPurchases) {
      forkJoin([this.getProductById(Number(purchase.productID))]).subscribe(
        ([product]) => {
          this.productForTotalPrice = product;
        }
      );
      this.totalPrice = (purchase.localQuantity * (this.productForTotalPrice.price - (this.productForTotalPrice.price * (this.productForTotalPrice.discount / 100)))).toString()
    }
  }

  getPurchasesList() {
    return this.purchaseService.getList()
  }

  getProductById(productId: number) {
    return this.productService.getById(productId)
  }

  updateProduct(productId: number, product: Product) {
    this.productService.update(productId, product)
  }

  disablePurchase(purchase: Purchase) {
    purchase.isAvailable = "false";
    //this.purchaseService.update(purchase.purchaseID, purchase)
  }

  disableAllPurchasesBought() {
    for (let purchase of this.customerPurchases) {
      this.disablePurchase(purchase)
    }
  }
  updateProductStock() {
    for (let purchase of this.customerPurchases) {
      forkJoin([this.getProductById(Number(purchase.productID))]).subscribe(
        ([product]) => {
          this.productForUpdate = product;
        }
      );
      this.productForUpdate.quantity = this.productForUpdate.quantity - purchase.localQuantity;
      this.updateProduct(purchase.productID, this.productForUpdate)
    }
  }



  postSale() {
    let completeDate = this.month + "/" + this.year;
    const sale = {
      saleID: this.sales.length,
      zipCode: this.zipCode,
      cvv: Number(this.cvv),
      cardNumber: this.cardNumber,
      date: completeDate,
      finalPrice: Number(this.totalPrice),
      userID: Number(this.customerId)
    }
    this.saleService.add(sale).subscribe(
      (response) => {
        console.log(response)
      }
    )
  }

  filterPurchasesByCustomerId(customerId: number, purchases: Purchase[]): Purchase[] {
    return purchases.filter(purchase => purchase.userID === customerId && (purchase.isAvailable.toLowerCase() == "true") );
  }


  receiveZipCode(zipReceived: string) {
    this.zipCode = zipReceived;
  }
  receiveEmail(emailReceived: string) {
    this.email = emailReceived;
  }
  receiveCardNumber(CardNumberReceived: string) {
    this.cardNumber = CardNumberReceived;
  }
  receiveMonth(monthReceived: string) {
    this.month = monthReceived;
  }
  receiveYear(yearReceived: string) {
    this.year = yearReceived;
  }
  receiveNit(nitReceived: string) {
    this.nit = nitReceived;
  }
  receiveCvv(cvvReceived: string) {
    this.cvv = cvvReceived;
  }
}
