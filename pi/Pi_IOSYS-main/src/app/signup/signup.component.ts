import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupform!: FormGroup
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.signupform = this.fb.nonNullable.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", Validators.required]
    })
  }
  get username() { return this.signupform.get('username') }
  get password() { return this.signupform.get('password') }
  get email() { return this.signupform.get("email") }
  signUp() {
    const { username, password, email } = this.signupform.value;
    this.authService.signUp(username, password, email).subscribe(response => {
      console.log(response);
      this.router.navigate(['/welcome']); // Rediriger vers la page de tableau de bord après l'inscription réussie
    }, error => {
      console.log(error)
    });
  }
}
