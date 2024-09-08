import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth-service.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any = {}; // Initialiser userProfile avec un objet vide
  paymentConfirmed: boolean = false; // Ajouter une propriété pour suivre la confirmation de paiement

  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(
      (response: any) => {
        this.userProfile = response; // Assigner les données du profil utilisateur récupérées à userProfile
      },
      (error) => {
        console.error('Error fetching user profile:', error);
        // Gérer l'erreur (affichage d'un message d'erreur par exemple)
      }
    );

    // Abonnez-vous à la confirmation de paiement
    this.cartService.getPaymentConfirmed().subscribe(confirmed => {
      this.paymentConfirmed = confirmed;
    });
  }
}
