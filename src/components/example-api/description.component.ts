import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BrandService } from "../../services/brands/brand.service";
import { Brand } from "../../models/brand.model";

@Component({
  selector: 'pet-paradise-client-app-description',
  standalone: true,
  imports: [],
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})

export class DescriptionComponent implements OnInit {
  brands: Brand[] = [];

  constructor(private brandService: BrandService) { 
  }

  ngOnInit(): void {
    this.getBrandList();
  }

  getBrandList() {
    this.brandService.getList().subscribe(
      (data) => {
        console.log('Brand List:', data);
        this.brands = data;
      },
      (error) => {
        console.error('Error fetching brand list:', error);
      }
    );
  }
}