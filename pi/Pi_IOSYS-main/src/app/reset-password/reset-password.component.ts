import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const { email, password } = this.resetPasswordForm.value;
      this.authService.resetPassword(email, password).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/welcome']); // Rediriger vers la page "welcome" après la mise à jour du mot de passe
          console.log("Password has been sent to your email");

        },
        error => {
          console.error(error);
          // Gérer l'erreur
        }
      );
    }
  }
}
