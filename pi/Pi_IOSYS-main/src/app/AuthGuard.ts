import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './service/auth-service.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/allusers']);
            return true; // Autorise l'accès à la route si l'utilisateur est connecté
        } else {
            this.router.navigate(['/login']); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
            return false;
        }
    }
}
