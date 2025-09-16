import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environmenst'; // <-- IMPORTANTE: crear este archivo

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth/login'; // <-- Ajusta la URL del backend

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const credentials = { nombreUsuario: username, contrasena: password };
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
