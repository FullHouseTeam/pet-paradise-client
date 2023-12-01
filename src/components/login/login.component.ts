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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, NgIf, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  error: string | undefined;
  errorMessage = '';
  isValid: boolean = false; 
  customerId: number | undefined;
  successMessage: string | undefined;

  constructor(private customerService: CustomerService, private router: Router) {
  }

  ngOnInit(): void {
  }

  hide = true;
  email = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{1,20}@[a-zA-Z0-9]{1,20}\\.[a-zA-Z0-9]{1,20}$')]);
  password = new FormControl('');

  getErrorMessageEmail() {
    if (this.email.invalid && (this.email.dirty || this.email.touched)) {
      if (this.email.hasError('required')) {
        return 'You must enter an email address';
      }
      return this.email.hasError('pattern') ? 'Not a valid email address' : '';
    }
    return '';
  }

  logIn() {
    console.log('Email:', this.email.value);
    console.log('Password:', this.password.value);
  }

  checkEmailValidity() {
    this.customerService.getList().subscribe(
      (customers: Customer[]) => {
        const sameEmailValidator = customers.find(customer => customer.email === this.email.value);
        const samePasswordValidator = customers.find(customer => customer.password === this.password.value);

        if (sameEmailValidator && samePasswordValidator) {
          console.log('Customer ID:', sameEmailValidator.customerID);
          this.successMessage = 'Login successful!! Welcome back!';

          setTimeout(() => {
            this.successMessage = '';
          }, 1500);
          
          this.router.navigate(['']);
        } else {
          this.errorMessage = 'Incorrect data!! No registered user was found with the data provided.';

          setTimeout(() => {
            this.errorMessage = '';
          }, 1500);
        }
      },
    );
  }
  closeErrorMessage() {
    this.errorMessage = '';
  }
  
  closeSuccessMessage() {
    this.successMessage = '';
  }
}
