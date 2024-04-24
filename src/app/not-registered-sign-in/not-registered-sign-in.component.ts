import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-not-registered-sign-in',
  templateUrl: './not-registered-sign-in.component.html',
  styleUrl: './not-registered-sign-in.component.css'
})
export class NotRegisteredSignInComponent {
  @ViewChild('phone') phoneInput!: ElementRef<HTMLInputElement>;
  phoneForm!: FormGroup;
  iti: any;
  submissionError: string = '';

  constructor(
    private fb: FormBuilder, 
    private translate: TranslateService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.phoneForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      code: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });    
  }

  ngAfterViewInit(): void {
    this.iti = intlTelInput(this.phoneInput.nativeElement, {
      initialCountry: 'TR',
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@21.2.5/build/js/utils.js"
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
    const controlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    
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
