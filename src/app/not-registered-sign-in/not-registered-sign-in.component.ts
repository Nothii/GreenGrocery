import { Component } from '@angular/core';

@Component({
  selector: 'app-not-registered-sign-in',
  templateUrl: './not-registered-sign-in.component.html',
  styleUrl: './not-registered-sign-in.component.css'
})
export class NotRegisteredSignInComponent {
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
