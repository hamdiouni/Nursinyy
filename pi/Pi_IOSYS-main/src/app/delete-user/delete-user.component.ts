import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  users!: any[];
  userId!: string;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUsers();
    this.route.params.subscribe(params => {
      this.userId = params['id']; // Récupérer l'ID de l'utilisateur de l'URL
    });

  }

  getUsers() {
    this.authService.showAllUsers().subscribe(
      (data: any) => {
        this.users = data.users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(userId: string) {
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
