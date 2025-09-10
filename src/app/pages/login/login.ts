// Importa las funcionalidades principales de Angular para crear un componente.
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Módulo para usar directivas comunes como *ngIf y *ngFor.
import { FormsModule } from '@angular/forms'; // Módulo para trabajar con formularios y ngModel.

// Corrige la ruta de importación para que apunte al archivo correcto (auth.ts).
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router'; // Importa el servicio Router para la navegación entre páginas.

// Define los metadatos del componente.
@Component({
  // 'selector' es el nombre de la etiqueta HTML que usas para llamar al componente.
  selector: 'app-login',
  // 'standalone: true' indica que este es un componente independiente y no necesita un módulo de Angular.
  standalone: true,
  // 'imports' son las dependencias que el componente necesita para funcionar.
  imports: [CommonModule, FormsModule],
  // 'templateUrl' es la ruta al archivo HTML de la vista del componente.
  templateUrl: './login.html',
  // 'styleUrl' es la ruta al archivo CSS para los estilos del componente.
  styleUrl: './login.css'
})
export class LoginComponent {
  // Propiedades para almacenar los datos del formulario.
  nombreUsuario = '';
  contrasena = '';
  // Propiedad para mostrar mensajes de error, inicialmente nula.
  mensajeError: string | null = null;

  // El constructor se usa para inyectar servicios que el componente necesita.
  // Inyectamos AuthService para la lógica de autenticación y Router para la navegación.
  constructor(private authService: AuthService, private router: Router) {}

  // Este método se ejecuta cuando el usuario intenta iniciar sesión.
  onLogin(): void {
    // Llama al método 'login' del servicio AuthService con los datos del formulario.
    // El método devuelve un 'Observable', por lo que nos 'suscribimos' para manejar la respuesta.
    this.authService.login(this.nombreUsuario, this.contrasena).subscribe({
      // El bloque 'next' se ejecuta cuando la solicitud es exitosa.
      // Se define 'response' como 'any' para evitar advertencias de tipado.
      next: (response: any) => {
        // Si el login es exitoso, navega a la página de 'dashboard'.
        this.router.navigate(['/dashboard']);
      },
      // El bloque 'error' se ejecuta si hay un problema con la solicitud.
      // Se define 'err' como 'any' para evitar advertencias de tipado.
      error: (err: any) => {
        // Muestra un mensaje de error al usuario.
        this.mensajeError = 'Usuario o contraseña incorrectos.';
        // Registra el error en la consola para depuración.
        console.error('Error de inicio de sesión:', err);
      }
    });
  }
}
