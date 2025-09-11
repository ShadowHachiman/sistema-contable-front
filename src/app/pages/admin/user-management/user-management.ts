import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth'; // Ruta corregida

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css' // Corregir el nombre del archivo CSS
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  newUser: any = { username: '', password: '', roles: [] };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.authService.getUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  addUser(): void {
    this.authService.addUser(this.newUser).subscribe(
      (response: any) => {
        console.log('Usuario agregado exitosamente:', response);
        this.getUsers();
        this.newUser = { username: '', password: '', roles: [] };
      },
      (error: any) => {
        console.error('Error al agregar usuario:', error);
      }
    );
  }

  deleteUser(id: number): void {
    this.authService.deleteUser(id).subscribe(
      () => {
        console.log('Usuario eliminado exitosamente');
        this.getUsers();
      },
      (error: any) => {
        console.error('Error al eliminar usuario:', error);
      }
    );
  }
}
