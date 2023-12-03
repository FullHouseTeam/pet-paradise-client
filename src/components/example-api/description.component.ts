import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PurchaseService } from "../../services/purchases/purchase.service";
import { Purchase } from "../../models/purchase.model";
import { FormGroup, Validators } from '@angular/forms';
import { PurchaseDTO } from '../../modelsDTO/purchaseDTO.model';

@Component({
  selector: 'pet-paradise-client-app-description',
  standalone: true,
  imports: [],
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})

export class DescriptionComponent implements OnInit {
  purchases: Purchase[] = [];
  purchaseForm: any;

  

  constructor(private purchaseService: PurchaseService) {
  }

  ngOnInit(): void {
    //this.getPurchaseList();
    //this.getPurchaseById(1);
    //this.editTotalPrice();
    //this.addPurchase();
  }
  
  getPurchaseList() {
    this.purchaseService.getList().subscribe(
      (data) => {
        this.purchases = data;
      },
      (error) => {
      }
    );
  }

  getPurchaseById(idPurchase: number) {
    this.purchaseService.getById(idPurchase).subscribe(
      (purchase) => {
      },
      (error) => {
      }
    );
  }

  
  editTotalPrice() {
    const idPurchase = 2; 
    const localQuantity = 20;
  
    this.purchaseService.getById(idPurchase).subscribe(
      (purchase) => this.handleEditSuccess(purchase, idPurchase, localQuantity),
      (error) => this.handleEditError(error)
    );

  }
  
  private handleEditSuccess(purchase: Purchase, idPurchase: number, newLocalQuantity: number) {
    if (purchase) {
      const updatedPurchaseDTO: PurchaseDTO = {
        totalPrice: purchase.totalPrice,
        obtainedTaxes: purchase.obtainedTaxes,
        deliveryTime: purchase.deliveryTime,
        localQuantity: newLocalQuantity,
        productID: purchase.productID,
        userID: purchase.userID,
        isAvailable: true,
      };
  
      this.purchaseService.update(idPurchase, updatedPurchaseDTO).subscribe(
        (response) => {
          this.getPurchaseList();
        },
        (error) => this.handleEditError(error)
      );
    } else {

    }
  }
  
  private handleEditError(error: any) {
  }

  addPurchase() {
    const newPurchaseDTO: PurchaseDTO = {
      totalPrice: 0,
      obtainedTaxes: 0,
      deliveryTime: 0,
      localQuantity: 0,
      productID: 0,
      userID: 0,
      isAvailable: false
    };

    this.purchaseService.add(newPurchaseDTO).subscribe(
      (response) => {
        this.getPurchaseList();
      },
      (error) => {
      }
    );
  }
  
}
