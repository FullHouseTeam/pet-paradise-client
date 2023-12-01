import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrandService} from "../../../services/brands/brand.service";
import {ProductService} from "../../../services/products/product.service";
import {Product} from "../../../models/product.model";
import {forkJoin} from "rxjs";
import {Brand} from "../../../models/brand.model";
import {Provider} from "../../../models/provider.model";
import {ExportedProviderStatusResolver} from "@angular/compiler-cli/src/ngtsc/metadata";
import {ProviderService} from "../../../services/suppliers/provider.service";

@Component({
  selector: 'app-product-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-summary.component.html',
  styleUrl: './product-summary.component.scss'
})
export class ProductSummaryComponent implements OnInit{
  @Input() product: Product = {} as Product;
  brand: Brand = {} as Brand;
  provider: Provider = {} as Provider;


  constructor(
    private brandService: BrandService,
    private providerService: ProviderService
  ) {
  }

  ngOnInit(): void {
    forkJoin([this.getBrandById(Number(this.product.brandID))]).subscribe(
      ([brand]) => {
        this.brand = brand;
        forkJoin([this.getProviderById(Number(this.product.providerID))]).subscribe(
          ([provider]) => {
            this.provider = provider;
          })
      })
  }



  getBrandById(brandId: number) {
    return this.brandService.getById(brandId)
  }

  getProviderById(providerId: number) {
    return this.providerService.getById(providerId)
  }

}
