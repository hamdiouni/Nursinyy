import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginform !: FormGroup
  forgotPasswordForm !: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required]
    });
  }

  login() {
    const { username, password } = this.loginform.value;

    // Vérification de l'identifiant et du mot de passe de l'administrateur
    if (username === 'admin' && password === 'admin') {
      // Naviguer vers le composant admin
      this.router.navigate(['/admin']);
    } else {
      // Authentification normale pour les utilisateurs non-administrateurs
      this.authService.login(username, password).subscribe(response => {
        console.log(response);
        this.router.navigate(['/profile']); // Rediriger vers la page de profil après une connexion réussie
      }, error => {
        console.log(error); // Afficher le message d'erreur de l'API
      });
    }
  }


  get username() { return this.loginform.get('username'); }
  get password() { return this.loginform.get('password'); }

  get email() { return this.forgotPasswordForm.get("email") }

  forgotPassword() {
    const { email } = this.forgotPasswordForm.value;
    this.authService.forgotPassword(email).subscribe(response => {
      console.log(response);
      // Afficher un message à l'utilisateur indiquant que l'e-mail de récupération a été envoyé
    }, error => {
      console.log(error) // Afficher le message d'erreur de l'API
    });
  }

}
