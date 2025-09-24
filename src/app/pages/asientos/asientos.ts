import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth'; // Importamos el servicio de autenticación

@Component({
  selector: 'app-asientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asientos.html',
  styleUrl: './asientos.css'
})
export class AsientosComponent implements OnInit {

  asientos: any[] = [];
  cuentas: any[] = []; // Se llenará con las cuentas del Plan de Cuentas

  nuevoAsiento: any = {
    fecha: '',
    descripcion: '',
    lineas: [{ cuenta: null, debe: null, haber: null }]
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Al iniciar, obtenemos las cuentas para usarlas en el formulario
    this.authService.getAccounts().subscribe(data => {
      this.cuentas = data;
    });

    // En un proyecto real, aquí también se cargarían los asientos existentes
    // this.getAsientos();
  }

  agregarLinea(): void {
    this.nuevoAsiento.lineas.push({ cuenta: null, debe: null, haber: null });
  }

  eliminarLinea(index: number): void {
    if (this.nuevoAsiento.lineas.length > 1) {
      this.nuevoAsiento.lineas.splice(index, 1);
    }
  }

  // Lógica de validación de partida doble
  esValido(): boolean {
    let totalDebe = 0;
    let totalHaber = 0;
    this.nuevoAsiento.lineas.forEach((linea: any) => {
      totalDebe += linea.debe || 0;
      totalHaber += linea.haber || 0;
    });
    return totalDebe > 0 && totalDebe === totalHaber;
  }

  // --- CORRECCIÓN DE TIPOS AQUÍ ---
  totalDebe(): number {
    return this.nuevoAsiento.lineas.reduce((sum: number, linea: any) => sum + (linea.debe || 0), 0);
  }

  totalHaber(): number {
    return this.nuevoAsiento.lineas.reduce((sum: number, linea: any) => sum + (linea.haber || 0), 0);
  }

  registrarAsiento(): void {
    if (this.esValido()) {
      // Lógica para enviar el asiento al backend
      console.log('Asiento válido, listo para enviar:', this.nuevoAsiento);
      // Aquí se llamaría a un servicio: this.authService.registrarAsiento(this.nuevoAsiento).subscribe(...)
      // Una vez enviado, podrías limpiar el formulario o recargar la lista de asientos.
    } else {
      console.error('El asiento no cumple con la partida doble.');
      alert('El total del Debe no es igual al total del Haber o los montos están vacíos.');
    }
  }
}
