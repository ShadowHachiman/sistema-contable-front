import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user'; // Importa el servicio

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagementComponent implements OnInit {

  users: any[] = [];
  newUser: any = {
    username: '',
    email: '',
    role: 'user' // Por defecto, el rol es 'user'
  };

  // Inyecta el servicio en el constructor
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  addUser(): void {
    if (this.newUser.username && this.newUser.email) {
      this.userService.addUser(this.newUser).subscribe(response => {
        console.log('Usuario agregado:', response);
        this.getUsers(); // Recarga la lista de usuarios
        this.newUser = { username: '', email: '', role: 'user' }; // Limpia el formulario
      });
    }
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      console.log('Usuario eliminado');
      this.getUsers(); // Recarga la lista de usuarios
    });
  }
}
