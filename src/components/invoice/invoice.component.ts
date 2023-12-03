import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductSummaryComponent} from "./product-summary/product-summary.component";
import {ShippingDataComponentComponent} from "./shipping-data/shipping-data-component.component";
import {Customer} from "../../models/customer.model";
import {Purchase} from "../../models/purchase.model";
import {CustomerService} from "../../services/customers/customer.service";
import {PurchaseService} from "../../services/purchases/purchase.service";
import {SaleService} from "../../services/sales/sale.service";
import {forkJoin} from "rxjs";
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/products/product.service";
import {PaymentDataComponentComponent} from "./payment-data-component/payment-data-component.component";
import {Sale} from "../../models/sale.model";
import {SharedService} from "../../services/globalAttributes/shared.service";

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, ProductSummaryComponent, ShippingDataComponentComponent, PaymentDataComponentComponent],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent implements OnInit{
  customerId: number = 0;
  customer:Customer = {} as Customer;
  purchases: Purchase[] = [];
  sales:Sale[] = []
  customerSale: Sale = {} as Sale;
  customerPurchases: Purchase[] = [];
  customerProducts: Product[] = [];


  constructor(
    private customerService: CustomerService,
    private purchaseService: PurchaseService,
    private saleService: SaleService,
    private productService: ProductService,
    private sharedService: SharedService
  ) {
  }
  ngOnInit(): void {
    this.customerId = Number(this.getCustomerId())
    forkJoin([this.getCustomerById(this.customerId)]).subscribe(
      ([customer]) => {
        this.customer = customer;
        forkJoin([this.getPurchases()]).subscribe(
          ([purchases]) => {
            this.purchases = purchases;
            forkJoin([this.getSales()]).subscribe(
              ([sales]) => {
                this.sales = sales;
                this.customerSale = this.filterSaleByCustomerId(this.customerId, this.sales)[0];
                this.customerPurchases = this.filterPurchasesByCustomerId(this.customerId, this.purchases);
                for (let purchase of this.customerPurchases) {
                  forkJoin([this.getProductById(purchase.productID)]).subscribe(
                    ([product]) => {
                      this.customerProducts.push(product);
                    })
                }

              })
          })
      })
  }


  loadData() {

  }

  getCustomerById(customerId: number) {
    return this.customerService.getById(customerId);
  }

  getPurchases() {
    return this.purchaseService.getList();
  }

  getSales() {
    return this.saleService.getList();
  }

  filterSaleByCustomerId(customerId: number, sales: Sale[]) {
    return sales.filter((sale => sale.userID === customerId && sale.isAvailable === "true"))
  }

  filterPurchasesByCustomerId(customerId: number, purchases: Purchase[]) {
    return purchases.filter((purchase => (purchase.userID === customerId && purchase.isAvailable === "true")))
  }

  getProductById(productId: number) {
    return this.productService.getById(productId);
  }

  getCustomerId() {
    return this.sharedService.getGlobalVariable()
  }
}
