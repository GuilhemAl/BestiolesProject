import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/auth';
  private userUrl = 'http://localhost:8080/api/user'; // URL pour obtenir les infos utilisateur
  private tokenKey = 'jwt'; // Clé pour le localStorage
  private userRolesKey = 'userRoles'; // Clé pour les rôles utilisateur

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl, { username, password }).pipe(
      tap(response => {
        this.setToken(response.id_token); // Assurez-vous d'utiliser la clé correcte de la réponse du backend
        this.fetchUserRoles(); // Récupérer et stocker les rôles utilisateur
      })
    );
  }

  logout() {
    this.removeToken();
    this.removeUserRoles();
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private setUserRoles(roles: string[]): void {
    localStorage.setItem(this.userRolesKey, JSON.stringify(roles));
  }

  private getUserRoles(): string[] {
    const roles = localStorage.getItem(this.userRolesKey);
    return roles ? JSON.parse(roles) : [];
  }

  private removeUserRoles(): void {
    localStorage.removeItem(this.userRolesKey);
  }

  fetchUserRoles(): void {
    this.http.get<any>(this.userUrl).pipe(
      map(response => response.authorities.map((authority: any) => authority.authority)),
      tap(roles => this.setUserRoles(roles)),
      catchError(() => {
        this.removeUserRoles();
        return of([]);
      })
    ).subscribe();
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getAuthToken(): string | null {
    return this.isAuthenticated() ? this.getToken() : null;
  }

  isAdmin(): boolean {
    return this.getUserRoles().includes('ROLE_ADMIN');
  }
}
