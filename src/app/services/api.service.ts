import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3001';

  // POST /login
  login(nome: string, senha: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { nome, senha });
  }

  // GET /vehicles
  getVehicles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicles`);
  }

  // POST /vehicleData
  getVehicleData(vin: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/vehicleData`, { vin });
  }
}