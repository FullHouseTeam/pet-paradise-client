import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'pet-paradise-client-add-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  constructor(private dialog: MatDialog){}
  
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    categories: new FormControl('',Validators.required),
    types: new FormControl('',Validators.required),
    discount: new FormControl('',Validators.required),
    provider: new FormControl('',Validators.required),
    brand: new FormControl('',Validators.required),
    avalible: new FormControl(false),
    hasTax: new FormControl(false),
  });

  handleSubmit() {
    console.log(this.profileForm.value);
  }
}
