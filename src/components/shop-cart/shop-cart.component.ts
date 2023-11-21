import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {LabelInputAsideComponent} from "../public-components/input/label-input-aside.component";
import {ProductViewEditionComponent} from "./product-view-edition/product-view-edition.component";
import {RouterOutlet} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

@Component({
  selector: 'pet-paradise-client-shop-cart',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, LabelInputAsideComponent, ProductViewEditionComponent, RouterOutlet, MatListModule, MatButtonToggleModule],
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent {}
