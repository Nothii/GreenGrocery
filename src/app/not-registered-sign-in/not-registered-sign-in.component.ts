import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import intlTelInput from 'intl-tel-input';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-not-registered-sign-in',
  templateUrl: './not-registered-sign-in.component.html',
  styleUrl: './not-registered-sign-in.component.css',
})
export class NotRegisteredSignInComponent {
  @ViewChild('phone') phoneInput!: ElementRef<HTMLInputElement>;
  phoneForm!: FormGroup;
  iti: any;
  submissionError: string = '';
  registerForm: FormGroup;

  constructor(
    private translate: TranslateService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  onSubmit() {
    // Logic to handle form submission
    if (this.registerForm.valid) {
      // Form is valid, perform form submission action
      this.authService.signUp(this.registerForm.value.email, this.registerForm.value.password);
    } else {
      // Form is invalid, display error messages or perform other actions
      console.error('Form is invalid. Please check the fields.');
    }
  }

  ngAfterViewInit(): void {
    this.iti = intlTelInput(this.phoneInput.nativeElement, {
      initialCountry: 'TR',
      utilsScript:
        'https://cdn.jsdelivr.net/npm/intl-tel-input@21.2.5/build/js/utils.js',
    });

    this.translate.onLangChange.subscribe(() => {
      this.updateCountryNames();
    });
  }

  updateCountryNames(): void {
    if (this.iti) {
      const currentCountries = this.iti.getCountryData();
      currentCountries.forEach((country: any) => {
        let langKey = `COUNTRIES.${country.iso2.toUpperCase()}`;
        country.name = this.translate.instant(langKey);
      });
      this.iti.setCountryData(currentCountries);
    }
  }

  onlyNumbersAllowed(event: KeyboardEvent): boolean {
    const allowedKeys = /[0-9]|\-|\(|\)/;
    const controlKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
    ];

    if (controlKeys.includes(event.key) || event.ctrlKey || event.metaKey) {
      return true;
    }

    if (!allowedKeys.test(event.key)) {
      event.preventDefault();
      return false;
    }

    return true;
  }
}
