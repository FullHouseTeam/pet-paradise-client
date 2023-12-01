import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Customer} from "../../../models/customer.model";
import {Sale} from "../../../models/sale.model";

@Component({
  selector: 'app-payment-data-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-data-component.component.html',
  styleUrl: './payment-data-component.component.scss'
})
export class PaymentDataComponentComponent{
  @Input() sale: Sale = {} as Sale;
  @Input() customer: Customer = {} as Customer;



}
