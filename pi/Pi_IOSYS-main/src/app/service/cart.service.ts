import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { composant } from '../composant';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<composant[]> = new BehaviorSubject<composant[]>([]);
  private paymentConfirmedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private paymentConfirmed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // Ajout d'un BehaviorSubject pour suivre la confirmation de paiement
  private total: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private paymentDetails: BehaviorSubject<any> = new BehaviorSubject<any>(null); // Ajout d'un BehaviorSubject pour les détails de paiement
  cart: any;
  constructor() { }

  getCart(): Observable<composant[]> {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(component: composant) {
    const currentCartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = [...currentCartItems, component];
    this.cartItemsSubject.next(updatedCartItems);
  }

  removeFromCart(component: composant) {
    const currentCartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = currentCartItems.filter(item => item !== component);
    this.cartItemsSubject.next(updatedCartItems);
  }

  updateQuantity(component: composant) {
    const currentCartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = currentCartItems.map(item => {
      if (item === component) {
        return { ...item, quantity: component.quantity };
      }
      return item;
    });
    this.cartItemsSubject.next(updatedCartItems);
  }

  updateCart() {
    // Ajoutez ici le code pour mettre à jour le panier sur le serveur
  }

  getTotal(): Observable<number> {
    return this.cartItemsSubject.pipe(
      map(items => items.reduce((acc, item) => acc + item.price * item.quantity, 0))
    );
  }



  clearCart() {
    this.cartItemsSubject.next([]);
    this.paymentConfirmedSubject.next(false);
  }


  getPaymentConfirmed(): Observable<boolean> { // Méthode pour obtenir la confirmation de paiement
    return this.paymentConfirmed.asObservable();
  }
  confirmPayment() { // Méthode pour confirmer le paiement
    const paymentDetails = {
      total: this.total.value,
      items: this.cart
    };
    this.paymentDetails.next(paymentDetails);
  }
  getPaymentDetails(): Observable<any> { // Méthode pour obtenir les détails de paiement
    return this.paymentDetails.asObservable();
  }


}