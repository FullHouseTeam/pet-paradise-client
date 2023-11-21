import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'pet-paradise-client-label-input-aside',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, NgStyle, MatDatepickerModule, NgForOf, MatButtonModule, MatNativeDateModule],
  templateUrl: './label-input-aside.component.html',
  styleUrls: ['./label-input-aside.component.scss'],
  providers: [

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class LabelInputAsideComponent {
  emailEntry = new FormControl();
  zipCodeEntry = new FormControl();
  cvvEntry = new FormControl();
  nitEntry = new FormControl();
  cardNumberEntry = new FormControl();
  date = new FormControl(moment(), Validators.required);


  getCardNumberErrorMessage() {
    this.cardNumberEntry.setValidators([Validators.required, Validators.pattern('^[0-9]{16}$')])

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


  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  validateDate(control: FormControl) {
    const selectedDate = moment(control.value);
    const currentDate = moment();
    console.log(selectedDate.isSameOrAfter(currentDate))
    return selectedDate.isSameOrAfter(currentDate) ? 'it is' : 'it is not';
  }
}
