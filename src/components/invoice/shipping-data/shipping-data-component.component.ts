import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Customer} from "../../../models/customer.model";
import {RegionService} from "../../../services/regions/region.service";
import {forkJoin} from "rxjs";
import {Region} from "../../../models/region.model";
import {Sale} from "../../../models/sale.model";
import {SharedService} from "../../../services/globalAttributes/shared.service";
import {CustomerService} from "../../../services/customers/customer.service";

@Component({
  selector: 'app-shipping-data-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipping-data-component.component.html',
  styleUrl: './shipping-data-component.component.scss'
})
export class ShippingDataComponentComponent implements OnInit{
  @Input() sale: Sale = {} as Sale;
  customer: Customer = {} as Customer
  customerId: number = 0;
  customerRegion: Region = {} as Region;

  constructor(
    private regionServices: RegionService,
    private sharedService: SharedService,
    private customerService: CustomerService
  ) {
  }
  ngOnInit(): void {
    this.customerId = Number(this.getCustomerID())
    forkJoin([this.getCustomerById(this.customerId)]).subscribe(
      ([customer]) => {
        this.customer = customer
        forkJoin([this.getRegionById(this.customer.regionID)]).subscribe(
          ([region]) => {
            this.customerRegion = region;
          })
      })

  }

  getRegionById(regionId: number) {
    return this.regionServices.getById(regionId);
  }

  getCustomerID() {
    return this.sharedService.getGlobalVariable();
  }

  getCustomerById(customerId: number) {
    return this.customerService.getById(customerId)
  }
}
