import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/auth';
  private tokenKey = 'jwt'; // Clé pour le localStorage
  private userRolesKey = 'userRoles'; // Clé pour les rôles utilisateur

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl, { username, password }).pipe(
      tap(response => {
        this.setToken(response.id_token); // Assurez-vous d'utiliser la clé correcte de la réponse du backend
        this.setUserRolesBasedOnUsername(username); // Définir les rôles utilisateur en fonction du nom d'utilisateur
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

  private setUserRolesBasedOnUsername(username: string): void {
    const roles = username === 'admin' ? ['ROLE_ADMIN'] : ['ROLE_USER'];
    this.setUserRoles(roles);
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
