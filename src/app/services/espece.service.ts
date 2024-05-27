import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspeceService {
  private apiUrl = 'http://localhost:8080/api/especes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(espece: any): Observable<any> {
    return this.http.post(this.apiUrl, espece);
  }

  update(id: number, espece: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, espece);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
