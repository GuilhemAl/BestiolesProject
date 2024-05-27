import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonneService {
  private apiUrl = 'http://localhost:8080/api/person';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
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
