import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Asegúrate de importar esto
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule], // Añade CommonModule aquí
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  isAdmin: boolean;

  constructor(private authService: AuthService) {
    this.isAdmin = this.authService.isAdmin();
  }
}
