import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Add this line

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userForm!: FormGroup; // Declare form group variable
  userId!: string;
  oldUser: any = { username: '', email: '' };

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({ // Initialize form group
      username: ['', Validators.required], // Add validators for username
      email: ['', [Validators.required, Validators.email]] // Add validators for email
    });

    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.authService.getUser(this.userId).subscribe(
        (user) => {
          this.oldUser.username = user.username;
          this.oldUser.email = user.email;
          this.userForm.patchValue({ // Patch form values instead of direct assignments
            username: this.oldUser.username,
            email: this.oldUser.email
          });
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    });
  }
  get username() { return this.userForm.get('username') }
  get email() { return this.userForm.get('email') }
  updateUser() {
    if (this.userForm.valid) { // Check form validity before updating
      this.authService.updateUser(this.userId, this.userForm.value).subscribe(
        () => {
          console.log('User updated successfully');
          this.router.navigate(['/allusers']);
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      console.log('Form is invalid'); // Log if form is invalid
    }
  }

}

