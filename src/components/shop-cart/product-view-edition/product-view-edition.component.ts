import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { NgOptimizedImage} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'pet-paradise-client-product-view-edition',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, MatButtonModule, NgOptimizedImage, MatGridListModule, MatButtonToggleModule, ReactiveFormsModule],
  templateUrl: './product-view-edition.component.html',
  styleUrls: ['./product-view-edition.component.scss']
})
export class ProductViewEditionComponent {
}
