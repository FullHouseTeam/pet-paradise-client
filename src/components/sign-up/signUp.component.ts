import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomerService } from '../../services/customers/customer.service';
import { Customer } from '../../models/customer.model';
import { SharedService } from '../../services/globalAttributes/shared.service';

@Component({
  selector: 'app-signUp',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, NgIf, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './signUp.component.html',
  styleUrl: './signUp.component.scss'
})
export class SignUpComponent {
  errorMessage = '';
  CustomerId: number | undefined;
  successMessage: string | undefined;

  constructor(private customerService: CustomerService, private router: Router) {
  }

  ngOnInit(): void {
  }

  hide = true;
  email = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{1,20}@[a-zA-Z0-9]{1,20}\\.[a-zA-Z0-9]{1,20}$')]);
  name = new FormControl('', [Validators.pattern(/^[^\d]+$/), Validators.maxLength(40), ]);
  password = new FormControl('', [Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]{6})[A-Za-z0-9]{8,}$/), ]);
  regionID = new FormControl('', [Validators.pattern(/^[1-9]\d*$/), Validators.min(1), Validators.max(9),]);
  nit = new FormControl('', [Validators.pattern(/^[6-9]\d{6,7}$/),]);

  public print() {
    console.log('Email:', this.email.value);
    console.log('Name:', this.name.value);
    console.log('Password:', this.password.value);
    console.log('Region ID:', this.regionID.value);
    console.log('NIT:', this.nit.value);
  }

  getErrorMessageEmail() {
    if (this.email.invalid && (this.email.dirty || this.email.touched)) {
      if (this.email.hasError('required')) {
        return 'You must enter an email address';
      }
      return this.email.hasError('pattern') ? 'Not a valid email address' : '';
    }
    return '';
  }

  getErrorMessageName() {
    if (this.name.invalid && (this.name.dirty || this.name.touched)) {
      if (this.name.hasError('required')) {
        return 'You must enter an name';
      }
      return this.name.hasError('pattern') ? 'Not a valid name' : '';
    }
    return '';
  }

  getErrorMessagePassword() {
    if (this.password.invalid && (this.password.dirty || this.password.touched)) {
      if (this.password.hasError('required')) {
        return 'You must enter an password';
      }
      return this.password.hasError('pattern') ? 'Not a valid password' : '';
    }
    return '';
  }

  getErrorMessageRegionID() {
    if (this.regionID.invalid && (this.regionID.dirty || this.regionID.touched)) {
      if (this.regionID.hasError('required')) {
        return 'You must enter an regionID';
      }
      return this.regionID.hasError('pattern') ? 'Not a valid regionID' : '';
    }
    return '';
  }
  
  getErrorMessageRegionNit() {
    if (this.nit.invalid && (this.nit.dirty || this.nit.touched)) {
      if (this.nit.hasError('required')) {
        return 'You must enter an nit';
      }
      return this.nit.hasError('pattern') ? 'Not a valid nit' : '';
    }
    return '';
  }

}
