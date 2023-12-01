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
import { ProductDTO } from '../../modelsDTO/productDTO.model';
import { Product } from '../../models/product.model';

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
  products: Product[] = [];
  currentMaxProductId: number = 0;

  selectedBrands: FormControl = new FormControl();
  selectedProviders: FormControl = new FormControl();

  constructor(
    private dialog: MatDialog,
    private SaleService: SaleService, 
    private BrandService: BrandService,
    private ProductService: ProductService
    ){}
  ngOnInit(): void {
    this.getProvidersList();
    this.getBrandService();
    this.getProductsList();
  }
  getProductsList() {
    // Assuming your ProductService has a method to get the list of products
    this.ProductService.getList().subscribe(
      (data) => {
        console.log('Product List:', data);
        this.products = data;

        // Find the current maximum product ID
        this.currentMaxProductId = Math.max(...this.products.map((product) => product.productID), 0);
      },
      (error) => {
        console.error('Error fetching product list:', error);
      }
    );
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
    price: new FormControl(0, Validators.required),
    quantity: new FormControl(1, Validators.required),
    categories: new FormControl('',Validators.required),
    types: new FormControl('',Validators.required),
    discount: new FormControl(0,Validators.required),
    provider: new FormControl(0,Validators.required),
    brand: new FormControl(0,Validators.required),
    isAvailable: new FormControl(false),
    hasTax: new FormControl(false),
    description: new FormControl('', Validators.required),
  });

  handleSubmit() {
    if (this.profileForm.valid) {
      const newProductId = this.currentMaxProductId + 1;
      const newProduct: ProductDTO = {
        name: this.profileForm.value.name as string,
        image: this.profileForm.value.image as string,
        price: this.profileForm.value.price as number,
        quantity: this.profileForm.value.quantity as number,
        animalCategory: this.profileForm.value.categories as string,
        discount: this.profileForm.value.discount as number,
        providerID: this.profileForm.value.provider as number,
        brandID: this.profileForm.value.brand as number,
        isAvailable: this.profileForm.value.isAvailable as boolean,
        hasTax: this.profileForm.value.hasTax as boolean,
        description: this.profileForm.value.description as string,
        productID: newProductId,
        productType: this.profileForm.value.types as string
      };
  
      this.ProductService.add(newProduct).subscribe(
        (addedProduct) => {
          console.log('Product added successfully:', addedProduct);
        },
        (error) => {
          console.error('Error adding product:', error);
        });
    } else {
      console.log('Form is invalid');
    }
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
