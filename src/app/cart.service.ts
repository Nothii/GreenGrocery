import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: any[] = []; // Array to store cart items

  constructor() {}

  addToCart(product: any) {
    const existingItemIndex = this.cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      this.cartItems[existingItemIndex].quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
  }

  removeFromCart(productId: number) {
    const index = this.cartItems.findIndex(item => item.id === productId);

    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }

  updateCartItem(item: any) {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);

    if (index !== -1) {
      this.cartItems[index].quantity = item.quantity;
    }
  }
}
