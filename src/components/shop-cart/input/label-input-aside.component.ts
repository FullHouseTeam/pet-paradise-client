import {Component, Output, EventEmitter} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from "@angular/material/select";


@Component({
  selector: 'pet-paradise-client-label-input-aside',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, NgStyle, MatDatepickerModule, NgForOf, MatButtonModule, MatNativeDateModule, MatSelectModule],
  templateUrl: './label-input-aside.component.html',
  styleUrls: ['./label-input-aside.component.scss'],

})
export class LabelInputAsideComponent {
  emailEntry = new FormControl();
  zipCodeEntry = new FormControl();
  cvvEntry = new FormControl();
  nitEntry = new FormControl();
  cardNumberEntry = new FormControl();
  yearsEntry = new FormControl();
  monthsEntry = new FormControl();
  years: string[] = ['2023', '2024', '2025', '2026', '2027', '2028', '2029'];
  months: any[] = [
    { value: '01', viewValue: 'January' },
    { value: '02', viewValue: 'February' },
    { value: '03', viewValue: 'March' },
    { value: '04', viewValue: 'April' },
    { value: '05', viewValue: 'May' },
    { value: '06', viewValue: 'June' },
    { value: '07', viewValue: 'July' },
    { value: '08', viewValue: 'August' },
    { value: '09', viewValue: 'September' },
    { value: '10', viewValue: 'October' },
    { value: '11', viewValue: 'November' },
    { value: '12', viewValue: 'December' }
  ];

  @Output() zipCodeValue = new EventEmitter<string>();
  @Output() emailValue = new EventEmitter<string>();
  @Output() cvvValue = new EventEmitter<string>();
  @Output() nitValue = new EventEmitter<string>();
  @Output() cardNumberValue = new EventEmitter<string>();
  @Output() monthValue = new EventEmitter<string>();
  @Output() yearValue = new EventEmitter<string>();


  sendEmailValue() {
    if (this.emailEntry.valid) {
      this.emailValue.emit(this.emailEntry.value)
    }
  }
  sendZipCodeValue() {
    if (this.zipCodeEntry.valid) {
      this.zipCodeValue.emit(this.zipCodeEntry.value)
    }
  }
  sendCvvValue() {
    if (this.cvvEntry.valid) {
      this.cvvValue.emit(this.cvvEntry.value)
    }
  }
  sendNitValue() {
    if (this.nitEntry.valid) {
      this.nitValue.emit(this.nitEntry.value)
    }
  }
  sendCardNumberValue() {
    if (this.cardNumberEntry.valid) {
      this.cardNumberValue.emit(this.cardNumberEntry.value)
    }
  }

  sendMonthValue() {
    if (this.monthsEntry.valid) {
      if( this.monthsEntry.value > 9) {
        this.monthValue.emit(this.monthsEntry.value.toString())
      } else {
        this.monthValue.emit('0' + this.monthsEntry.value.toString())
      }
    }
  }
  sendYearValue() {

    if (this.yearsEntry.valid) {
      this.yearValue.emit(this.yearsEntry.value.toString())
    }

  }



  getCardNumberErrorMessage() {
    this.cardNumberEntry.setValidators([Validators.required, Validators.pattern('^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$')])

    if (this.cardNumberEntry.hasError('required')) {
      return 'fill this field';
    }
    if (this.cardNumberEntry.hasError('pattern')) {
      return 'wrong format'
    }

    return '';
  }

  getNITErrorMessage() {
    this.nitEntry.setValidators([Validators.required, Validators.pattern('^[0-9]{7,9}$')])

    if (this.nitEntry.hasError('required')) {
      return 'fill this field';
    }
    if (this.nitEntry.hasError('pattern')) {
      return 'wrong format'
    }

    return '';
  }

  getZipCodeErrorMessage() {
    this.zipCodeEntry.setValidators([Validators.required, Validators.pattern('(^[0-9]{5}$)|(^[0-9]{5}-[0-9]{4}$)')])

    if (this.zipCodeEntry.hasError('required')) {
      return 'fill this field';
    }
    if (this.zipCodeEntry.hasError('pattern')) {
      return 'wrong format'
    }

    return '';
  }

  getEmailErrorMessage() {

    this.emailEntry.setValidators([Validators.required, Validators.pattern('^[a-zA-Z0-9]{1,20}@[a-zA-Z0-9]{1,20}\\.[a-zA-Z0-9]{1,20}$')])

    if (this.emailEntry.hasError('required')) {
      return 'fill this field';
    }
    if (this.emailEntry.hasError('pattern')) {
      return 'wrong format'
    }

    return '';
  }

  getCVVErrorMessage() {
    this.cvvEntry.setValidators([Validators.required, Validators.pattern('^[0-9]{3}$')])

    if (this.cvvEntry.hasError('required')) {
      return 'fill this field'
    }

    if (this.cvvEntry.hasError('pattern')) {
      return 'wrong format'
    }

    return '';
  }

  getMonthValidation() {
    this.monthsEntry.setValidators([Validators.required, Validators.min(1), Validators.max(12)])
    if (this.monthsEntry.hasError('required')) {
      return 'fill this field'
    }

    if (this.monthsEntry.hasError('min')  || this.monthsEntry.hasError('max')) {
      return 'value 1-12'
    }

    return '';
  }

  getYearValidation() {
    this.yearsEntry.setValidators([Validators.required, Validators.min(2024), Validators.max(2035)])
    if (this.yearsEntry.hasError('required')) {
      return 'fill this field'
    }

    if (this.yearsEntry.hasError('min')) {
      return 'value >2023'
    }

    if (this.yearsEntry.hasError('max')) {
      return 'value <2036'
    }

    return '';
  }
}