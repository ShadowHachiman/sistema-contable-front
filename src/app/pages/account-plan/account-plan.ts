import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Requerido para *ngFor
import { AuthService } from '../../services/auth'; // Ruta corregida

@Component({
  selector: 'app-account-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-plan.html',
  styleUrl: './account-plan.css' // Corregir el nombre del archivo CSS
})
export class AccountPlanComponent implements OnInit {
  accounts: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(): void {
    this.authService.getAccounts().subscribe(
      (data: any) => {
        this.accounts = data;
      },
      (error: any) => {
        console.error('Error al obtener el plan de cuentas:', error);
      }
    );
  }
}
