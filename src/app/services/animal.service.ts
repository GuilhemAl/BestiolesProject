import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private baseUrl = 'http://localhost:8080/api/animal';

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getAll(contains?: string): Observable<any[]> {
    let url = this.baseUrl;
    if (contains) {
      url += `?contains=${contains}`;
    }
    return this.http.get<any[]>(url);
  }

  update(id: number, animal: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, animal);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  create(animal: any): Observable<any> {
    return this.http.post(this.baseUrl, animal);
  }
}
