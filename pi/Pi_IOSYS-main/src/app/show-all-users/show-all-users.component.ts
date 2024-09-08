import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth-service.service';

@Component({
  selector: 'app-show-all-users',
  templateUrl: './show-all-users.component.html',
  styleUrls: ['./show-all-users.component.css']
})
export class ShowAllUsersComponent implements OnInit {

  users: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.authService.showAllUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(userId: string) {
    // Demander confirmation avant la suppression
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      this.authService.deleteUser(userId).subscribe(
        () => {
          // Rafraîchir la liste des utilisateurs après la suppression
          this.getUsers();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
}
