import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Requerido para [(ngModel)]
import { AuthService } from '../../../services/auth'; // Ruta corregida

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [CommonModule, FormsModule], // Agregar FormsModule
  templateUrl: './account-management.html',
  styleUrl: './account-management.css' // Corregir el nombre del archivo CSS
})
export class AccountManagementComponent implements OnInit {
  accounts: any[] = [];
  newAccount: any = { code: '', name: '', type: '' };

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

  addAccount(): void {
    this.authService.addAccount(this.newAccount).subscribe(
      (response: any) => {
        console.log('Cuenta agregada exitosamente:', response);
        this.getAccounts();
        this.newAccount = { code: '', name: '', type: '' };
      },
      (error: any) => {
        console.error('Error al agregar cuenta:', error);
      }
    );
  }

  deleteAccount(id: number): void {
    this.authService.deleteAccount(id).subscribe(
      () => {
        console.log('Cuenta eliminada exitosamente');
        this.getAccounts();
      },
      (error: any) => {
        console.error('Error al eliminar cuenta:', error);
      }
    );
  }
}
