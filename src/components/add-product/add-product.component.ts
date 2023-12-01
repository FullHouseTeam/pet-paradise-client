import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { Provider } from '../../models/provider.model';
import { Brand } from '../../models/brand.model';
import { Types } from '../../models/types.model';
import { Categories } from '../../models/categories.model';
import { ProductService } from '../../services/products/product.service';
import { SaleService } from '../../services/suppliers/provider.service';
import { BrandService } from '../../services/brands/brand.service';

@Component({
  selector: 'pet-paradise-client-add-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, 
    ReactiveFormsModule, MatFormFieldModule,
     MatInputModule,FormsModule, 
     MatButtonModule, MatIconModule,
     MatSelectModule, MatCheckboxModule, 
     MatRadioModule, MatDialogModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit{
  providerService: Provider[] = [];
  brandService: Brand[] = [];

  selectedBrands: FormControl = new FormControl();
  selectedProviders: FormControl = new FormControl();

  constructor(
    private dialog: MatDialog,
    private SaleService: SaleService, 
    private BrandService: BrandService
    ){}
  ngOnInit(): void {
    this.getProvidersList();
    this.getBrandService();

  }

  getProvidersList(){
    this.SaleService.getList().subscribe(
      (data) => {
        console.log('Purchase List:', data);
        this.providerService = data;
        this.selectedProviders.setValue(this.providerService.map(provider => provider.providerID));
      },
      (error) => {
        console.error('Error fetching brand list:', error);
      }
    );
  }

  getBrandService(){
    this.BrandService.getList().subscribe(
      (data) => {
        console.log('Purchase List:', data);
        this.brandService = data;
        this.selectedProviders.setValue(this.brandService.map(brand => brand.brandID));
      },
      (error) => {
        console.error('Error fetching brand list:', error);
      }
    );
  }
  
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    quantity: new FormControl(1, Validators.required),
    categories: new FormControl('',Validators.required),
    types: new FormControl('',Validators.required),
    discount: new FormControl(0,Validators.required),
    provider: new FormControl('',Validators.required),
    brand: new FormControl('',Validators.required),
    avalible: new FormControl(false),
    hasTax: new FormControl(false),
    description: new FormControl('', Validators.required),
  });

  handleSubmit() {
    console.log(this.profileForm.value);
  }


  types: Types[]=[
    { name: "toy"},
    { name: "food"},
    { name: "house"},
    { name: "feeder"},
    { name: "clothes"},
    { name: "care"},
    { name: "collars_and_leashes"},
    { name: "beds_and_pillows"},
    { name: "carriers_and_cages"},
    { name: "hygiene_products"},
    { name: "health_products"},
    { name: "travel_supplies"},
    { name: "aquarium_and_fish_supplies"},
    { name: "veterinary_pharmacy"},
];

  categories: Categories[]=[
    {name: "dog"},
    {name: "cat"},
    {name: "bird"},
    {name: "fish"},
    {name: "rodent"},
    {name: "other"},
  ];
}
