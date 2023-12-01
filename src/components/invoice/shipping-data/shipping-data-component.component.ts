import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Customer} from "../../../models/customer.model";
import {RegionService} from "../../../services/regions/region.service";
import {forkJoin} from "rxjs";
import {Region} from "../../../models/region.model";
import {Sale} from "../../../models/sale.model";

@Component({
  selector: 'app-shipping-data-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipping-data-component.component.html',
  styleUrl: './shipping-data-component.component.scss'
})
export class ShippingDataComponentComponent implements OnInit{
  @Input() sale: Sale = {} as Sale;
  @Input() customer: Customer = {} as Customer;
  customerRegion: Region = {} as Region;

  constructor(
    private regionServices: RegionService
  ) {
  }
  ngOnInit(): void {
    forkJoin([this.getRegionById(this.customer.regionID)]).subscribe(
      ([region]) => {
        this.customerRegion = region;
      })
  }

  getRegionById(regionId: number) {
    return this.regionServices.getById(regionId);
  }

}
