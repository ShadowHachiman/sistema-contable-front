import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_TOKEN_KEY = 'authToken';
  private readonly USER_ROLE_KEY = 'userRole';

  // This line declares the 'loggedIn' property and is crucial.
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  // URL base de tu API de Spring Boot
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };

    return this.http.post<any>(`${this.apiUrl}/auth/login`, body).pipe(
      tap((response: any) => {
        const userRole = response.roles[0];
        localStorage.setItem(this.USER_ROLE_KEY, userRole);
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
}
