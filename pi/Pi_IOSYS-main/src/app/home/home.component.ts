import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router, // Injectez le service Router
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  logout() {
    this.authService.logout(); // Supprimez la souscription, car nous n'avons pas besoin de réponse
    console.log('User logged out successfully');
    this.router.navigate(['/accueil']); // Utilisez la méthode navigate du service Router
    // Rediriger vers une autre page ou effectuer d'autres actions après la déconnexion
  }

}
