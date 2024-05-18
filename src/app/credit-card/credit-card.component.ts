import { Component } from '@angular/core';

@Component({
  selector: 'app-product-interface',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent {
  cartItems: any[] = [];
  checkoutConfirmed: boolean = false;

  confirmCheckout() {
    if (window.confirm('Are you sure you want to proceed to checkout?')) {
      this.proceedToCheckout();
      this.checkoutConfirmed = true;
    }
  }
  
  proceedToCheckout() {
    alert("Thank you.");
    this.cartItems.splice(0, this.cartItems.length);
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.confirmCheckout();
    }
  }
}
