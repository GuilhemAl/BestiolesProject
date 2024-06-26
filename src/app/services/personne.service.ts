import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {
  private apiUrl = 'http://localhost:8080/api/person';

  constructor(private http: HttpClient) {}

  getAll(contains?: string): Observable<any[]> {
    let url = this.apiUrl;
    if (contains) {
      url += `?contains=${contains}`;
    }
    return this.http.get<any[]>(url);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(personne: any): Observable<any> {
    return this.http.post(this.apiUrl, personne);
  }

  update(id: number, personne: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, personne);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
