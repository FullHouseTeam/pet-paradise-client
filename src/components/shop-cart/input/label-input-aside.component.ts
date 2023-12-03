import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from "@angular/material/select";
import {forkJoin, of, switchMap} from "rxjs";
import {PurchaseService} from "../../../services/purchases/purchase.service";
import {Purchase} from "../../../models/purchase.model";
import {ProductService} from "../../../services/products/product.service";
import {Product} from "../../../models/product.model";
import {ProductDTO} from "../../../modelsDTO/productDTO.model";
import {PurchaseDTO} from "../../../modelsDTO/purchaseDTO.model";
import {SaleService} from "../../../services/sales/sale.service";
import {SaleDTO} from "../../../modelsDTO/saleDTO.model";
import {Sale} from "../../../models/sale.model";
import {Router} from "@angular/router";
import {SharedService} from "../../../services/globalAttributes/shared.service";


@Component({
  selector: 'pet-paradise-client-label-input-aside',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, NgStyle, MatDatepickerModule, NgForOf, MatButtonModule, MatNativeDateModule, MatSelectModule],
  templateUrl: './label-input-aside.component.html',
  styleUrls: ['./label-input-aside.component.scss'],

})
export class LabelInputAsideComponent implements OnInit{
  customerId: number = 0;
  emailEntry = new FormControl();
  productForUpdate: Product = {} as Product;
  zipCodeEntry = new FormControl();
  cvvEntry = new FormControl();
  nitEntry = new FormControl();
  cardNumberEntry = new FormControl();
  yearsEntry = new FormControl();
  monthsEntry = new FormControl();
  purchases: Purchase[] = []
  customerPurchases: Purchase[] = []
  sales: Sale[] = []
  totalPrice: number = 0;


  constructor(
    private purchaseService: PurchaseService,
    private productService: ProductService,
    private saleService: SaleService,
    private router: Router,
    private sharedService: SharedService
  ) {
  }



  getCardNumberErrorMessage() {
    this.cardNumberEntry.setValidators([Validators.required, Validators.pattern('^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$')])

    if (this.cardNumberEntry.hasError('required')) {
      return 'fill this field';
    }
    if (this.cardNumberEntry.hasError('pattern')) {
      return 'wrong format'
    }

    return '';
  }

  getNITErrorMessage() {
    this.nitEntry.setValidators([Validators.required, Validators.pattern('^[0-9]{7,9}$')])

    if (this.nitEntry.hasError('required')) {
      return 'fill this field';
    }
    if (this.nitEntry.hasError('pattern')) {
      return 'wrong format'
    }

    return '';
  }

  getZipCodeErrorMessage() {
    this.zipCodeEntry.setValidators([Validators.required, Validators.pattern('(^[0-9]{5}$)|(^[0-9]{5}-[0-9]{4}$)')])

    if (this.zipCodeEntry.hasError('required')) {
      return 'fill this field';
    }
    if (this.zipCodeEntry.hasError('pattern')) {
      return 'wrong format'
    }

    return '';
  }

  getEmailErrorMessage() {

    this.emailEntry.setValidators([Validators.required, Validators.pattern('^[a-zA-Z0-9]{1,20}@[a-zA-Z0-9]{1,20}\\.[a-zA-Z0-9]{1,20}$')])

    if (this.emailEntry.hasError('required')) {
      return 'fill this field';
    }
    if (this.emailEntry.hasError('pattern')) {
      return 'wrong format'
    }

    return '';
  }

  getCVVErrorMessage() {
    this.cvvEntry.setValidators([Validators.required, Validators.pattern('^[0-9]{3}$')])

    if (this.cvvEntry.hasError('required')) {
      return 'fill this field'
    }

    if (this.cvvEntry.hasError('pattern')) {
      return 'wrong format'
    }

    return '';
  }

  getMonthValidation() {
    this.monthsEntry.setValidators([Validators.required, Validators.min(1), Validators.max(12)])
    if (this.monthsEntry.hasError('required')) {
      return 'fill this field'
    }

    if (this.monthsEntry.hasError('min')  || this.monthsEntry.hasError('max')) {
      return 'value 1-12'
    }

    return '';
  }

  getYearValidation() {
    this.yearsEntry.setValidators([Validators.required, Validators.min(2024), Validators.max(2035)])
    if (this.yearsEntry.hasError('required')) {
      return 'fill this field'
    }

    if (this.yearsEntry.hasError('min')) {
      return 'value >2023'
    }

    if (this.yearsEntry.hasError('max')) {
      return 'value <2036'
    }

    return '';
  }

  updateProductStock() {
    for (let purchase of this.customerPurchases) {
      forkJoin([this.getProductById(Number(purchase.productID))]).subscribe(
        ([product]) => {
          this.productForUpdate = product;
          this.productForUpdate.quantity = this.productForUpdate.quantity - purchase.localQuantity;
          console.log(this.productForUpdate)
          this.updateProduct(purchase.productID, this.prepareProductToUpdate())

        }
      );

    }
  }

  preparePurchaseToPost(purchase: Purchase) {
    let purchaseToUpdate: PurchaseDTO = {} as PurchaseDTO;

    purchaseToUpdate.isAvailable = Boolean(purchase.isAvailable)
    purchaseToUpdate.totalPrice = purchase.totalPrice
    purchaseToUpdate.productID = purchase.productID
    purchaseToUpdate.localQuantity = purchase.localQuantity
    purchaseToUpdate.userID = purchase.userID
    purchaseToUpdate.deliveryTime = purchase.deliveryTime
    purchaseToUpdate.obtainedTaxes = purchase.obtainedTaxes

    return purchaseToUpdate
  }
  disablePurchase(purchaseId:number, purchase: PurchaseDTO) {
    purchase.isAvailable = false;
    this.purchaseService.update(purchaseId, purchase)
  }

  disableAllPurchasesBought() {
    for (let purchase of this.customerPurchases) {
      purchase.isAvailable = "false";
      this.disablePurchase(purchase.purchaseID, this.preparePurchaseToPost(purchase))
    }
  }

  updateProduct(productId: number, product: ProductDTO) {
    this.productService.update(productId, product)
  }

  postSale() {

    let completeDate = this.checkMonthFormat(this.monthsEntry.value) + "/" + this.yearsEntry.value.toString();
    let sale: SaleDTO = {} as SaleDTO

    sale.zipCode = this.zipCodeEntry.value.toString();
    sale.cvv = Number(this.cvvEntry.value);
    sale.isAvailable = "true";
    sale.userID = Number(this.customerId);
    sale.cardNumber = this.cardNumberEntry.value.toString();
    sale.date = completeDate;
    sale.finalPrice = this.totalPrice;

    console.log(sale);
    this.saleService.add(sale);
  }


  checkMonthFormat(month: number) {
    return month < 10 ? ('0' + month.toString()) : month.toString()
  }
  buyProcess() {
    if (this.monthsEntry.valid && this.yearsEntry.valid && this.cvvEntry.valid && this.cardNumberEntry.valid && this.nitEntry.valid && this.zipCodeEntry.valid) {
      forkJoin([
        this.getPurchases()
      ]).subscribe(([purchases]) => {
        this.purchases = purchases;
        this.customerPurchases = this.filterPurchasesByCustomerId(Number(this.customerId), this.purchases)
        }
      );
      console.log(this.customerPurchases.length)
      if (this.customerPurchases.length > 0) {
        of(null).pipe(
          switchMap(() => this.getTotalPrice()),
          switchMap((total) => {
            console.log('asdfghjklñ: ' + total);
            this.totalPrice = total;
            this.updateProductStock();
            this.postSale();
            return this.router.navigate(['invoice']);
          })
        ).subscribe();
      }
    }

  }

  filterPurchasesByCustomerId(customerId: number, purchases: Purchase[]) {
    let filteredPurchases: Purchase[] = [];
    for (let purchase of purchases) {
      if (purchase.userID === customerId && purchase.isAvailable === "true") {
        filteredPurchases.push(purchase)
      }
    }
    return filteredPurchases;
  }

  ngOnInit(): void {
    this.customerId = Number(this.getCustomer())
    forkJoin([
      this.getPurchases(),
      this.getSales()
    ]).subscribe(([purchases, sales]) => {
      this.purchases = purchases;
      this.sales = sales
      this.customerPurchases = this.filterPurchasesByCustomerId(Number(this.customerId), this.purchases)
      }
    );
  }

  getPurchases() {
    return this.purchaseService.getList();
  }
  getSales() {
    return this.saleService.getList();
  }

  getProductById(productId: number) {
    return this.productService.getById(productId)
  }

  prepareProductToUpdate() {
    let productToPost: ProductDTO = {} as ProductDTO;
    productToPost.productID = this.productForUpdate.productID
    productToPost.productType = this.productForUpdate.productType
    productToPost.price = this.productForUpdate.price
    productToPost.quantity = this.productForUpdate.quantity
    productToPost.isAvailable = Boolean(this.productForUpdate.isAvailable)
    productToPost.animalCategory = this.productForUpdate.animalCategory
    productToPost.brandID = Number(this.productForUpdate.brandID)
    productToPost.providerID = this.productForUpdate.providerID
    productToPost.description = this.productForUpdate.description
    productToPost.discount = this.productForUpdate.discount
    productToPost.hasTax = Boolean(this.productForUpdate.hasTax)
    productToPost.image = this.productForUpdate.image
    return productToPost
  }

  getTotalPrice() {
    return forkJoin(
      this.customerPurchases.map(purchase => this.getProductById(purchase.productID))
    ).pipe(
      switchMap(products => {
        let total = 0;
        for (let i = 0; i < this.customerPurchases.length; i++) {
          total += (products[i].price - (products[i].price * products[i].discount / 100)) * this.customerPurchases[i].localQuantity;
        }
        return of(total);
      })
    );
  }

  getCustomer() {
    return this.sharedService.getGlobalVariable()
  }
}