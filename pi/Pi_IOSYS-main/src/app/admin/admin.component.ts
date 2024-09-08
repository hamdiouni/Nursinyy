// admin.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUsers();
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

}
