import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Observable } from 'rxjs';
import { composant } from '../composant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems$: Observable<composant[]>;

  constructor(private cartService: CartService, private router: Router) {
    this.cartItems$ = this.cartService.getCart(); // Assurez-vous que cartItems$ est un observable
  }

  getTotal(): Observable<number> {
    return this.cartService.getTotal();
  }

  cancelOrder() {
    this.cartService.clearCart();
  }

  updateCart() {
    this.cartService.updateCart();
  }

  removeFromCart(component: composant) {
    this.cartService.removeFromCart(component);
  }

  updateQuantity(component: composant) {
    this.cartService.updateQuantity(component);
  }

  confirmPayment() { // Méthode pour confirmer le paiement
    this.cartService.confirmPayment();
    this.router.navigate(['/profile']); // Rediriger vers la page de profil après une connexion réussie

  }
}
