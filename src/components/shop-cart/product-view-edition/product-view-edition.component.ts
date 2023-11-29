import {Component, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { NgOptimizedImage} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Product} from "../../../models/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/products/product.service";
import {forkJoin} from "rxjs";
import {PurchaseService} from "../../../services/purchases/purchase.service";
import {Purchase} from "../../../models/purchase.model";
import EventEmitter from "events";

@Component({
  selector: 'pet-paradise-client-product-view-edition',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, MatButtonModule, NgOptimizedImage, MatGridListModule, MatButtonToggleModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-view-edition.component.html',
  styleUrls: ['./product-view-edition.component.scss']
})
export class ProductViewEditionComponent {
  @Input() productName: string = '';
  @Input() productPrice: string = '';
  @Input() productImage: string = '';
}

