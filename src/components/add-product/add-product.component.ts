import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { Provider } from '../../models/provider.model';
import { Brands } from '../../models/brands.model';
import { Types } from '../../models/types.model';
import { Categories } from '../../models/categories.model';


@Component({
  selector: 'pet-paradise-client-add-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, 
    ReactiveFormsModule, MatFormFieldModule,
     MatInputModule,FormsModule, 
     MatButtonModule, MatIconModule,
     MatSelectModule, MatCheckboxModule, 
     MatRadioModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  constructor(private dialog: MatDialog){}
  
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

  providers: Provider[] = [
    { id: 1, name: "PepesProducts", nacionality: "Brasil" },
    { id: 2, name: "PurinaMexico" , nacionality: "Mexico"},
    { id: 3, name: "PedigreeLaPaz" , nacionality: "Bolivia"},
  ];

  brands: Brands []=[
    {id: 1, name: "DogChow", logo: "sdsd"},
    {id: 2, name: "Pedigree", logo: "sdsd"},
  ];

  types: Types[]=[
    { id: 1, name: "Food"},
    { id: 2, name: "Houses"},
    { id: 3, name: "Accesories"},
  ];

  categories: Categories[]=[
    { id: 1, name: "Dogs"},
    { id: 2, name: "Cats"},
    { id: 3, name: "Birds"},
    { id: 4, name: "Fishes"},
    { id: 5, name: "Rodents"},
    { id: 6, name: "Others"},
  ];
}
