import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importez le service Router

import { AuthService } from '../service/auth-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router, // Injectez le service Router
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout(); // Supprimez la souscription, car nous n'avons pas besoin de réponse
    console.log('User logged out successfully');
    this.router.navigate(['/accueil']); // Utilisez la méthode navigate du service Router
    // Rediriger vers une autre page ou effectuer d'autres actions après la déconnexion
  }
}
