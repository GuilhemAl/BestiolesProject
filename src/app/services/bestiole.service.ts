import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BestioleService {
  private apiUrl = 'http://localhost:8080/api/bestioles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(bestiole: any): Observable<any> {
    return this.http.post(this.apiUrl, bestiole);
  }

  update(id: number, bestiole: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, bestiole);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
