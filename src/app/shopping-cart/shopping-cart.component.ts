import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    // Update cart items after removal
    this.cartItems = this.cartService.getCartItems();
  }

  increaseQuantity(item: any) {
    item.quantity++;
    // Update cart items after increasing quantity
    this.cartService.updateCartItem(item);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      // Update cart items after decreasing quantity
      this.cartService.updateCartItem(item);
    }
  }
}
