import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "../product-card/product-card.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { CdkFixedSizeVirtualScroll } from "@angular/cdk/scrolling";
import { CategoriesContainerComponent } from "../categories-container/categories-container.component";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { ProductService } from "../../services/products/product.service";
import { Product } from "../../models/product.model";

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'pet-paradise-client-categories-and-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent,ReactiveFormsModule, MatButtonToggleModule, MatButtonModule, MatInputModule, MatSelectModule, CdkFixedSizeVirtualScroll, CategoriesContainerComponent],
  templateUrl: './categories-and-products.component.html',
  styleUrls: ['./categories-and-products.component.scss']
})
export class CategoriesAndProductsComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private productService: ProductService) {
  }

  openDialog() {
    const dialogRef: MatDialogRef<AddProductComponent, any> = this.dialog.open(AddProductComponent);
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
  productCategory: string = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productCategory = params['category'];
      forkJoin([this.getProductsList()]).subscribe(
        ([products]) => {

          this.loadProductDetails(products)
    })

  })
  }

  private loadProductDetails(prods: Product[]) {
    this.products = prods
    if (this.productCategory === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.animalCategory === this.productCategory);
    }
  }
  getProductsList() {
    return this.productService.getList();
  }
}
