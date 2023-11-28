import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductCardComponent} from "../product-card/product-card.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {CdkFixedSizeVirtualScroll} from "@angular/cdk/scrolling";
import {CategoriesContainerComponent} from "../categories-container/categories-container.component";

@Component({
  selector: 'pet-paradise-client-categories-and-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatButtonToggleModule, MatButtonModule, MatInputModule, MatSelectModule, CdkFixedSizeVirtualScroll, CategoriesContainerComponent],
  templateUrl: './categories-and-products.component.html',
  styleUrls: ['./categories-and-products.component.scss']
})
export class CategoriesAndProductsComponent {

}
