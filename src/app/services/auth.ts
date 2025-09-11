import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_TOKEN_KEY = 'authToken';
  private readonly USER_ROLE_KEY = 'userRole';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.AUTH_TOKEN_KEY);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };

    return this.http.post<any>(`${this.apiUrl}/auth/login`, body).pipe(
      tap((response: any) => {
        const userRole = response.roles[0];
        localStorage.setItem(this.USER_ROLE_KEY, userRole);
        localStorage.setItem(this.AUTH_TOKEN_KEY, response.token); // Almacenar el token
        this.loggedIn.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    localStorage.removeItem(this.USER_ROLE_KEY);
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isAdmin(): boolean {
    const userRole = localStorage.getItem(this.USER_ROLE_KEY);
    return userRole === 'ADMIN';
  }

  // Métodos para la gestión de usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/users`, { headers: this.getHeaders() });
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/users/add`, user, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/users/delete/${id}`, { headers: this.getHeaders() });
  }

  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/accounts`, { headers: this.getHeaders() });
  }

  addAccount(account: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/accounts/add`, account, { headers: this.getHeaders() });
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/accounts/delete/${id}`, { headers: this.getHeaders() });
  }
}
