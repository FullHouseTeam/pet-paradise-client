import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductSummaryComponent} from "./product-summary/product-summary.component";
import {ShippingDataComponentComponent} from "./shipping-data/shipping-data-component.component";

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, ProductSummaryComponent, ShippingDataComponentComponent],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {

}
