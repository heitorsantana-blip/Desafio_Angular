import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


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

  // GET /vehicles - Utiliza o operador map do RxJS
  getVehicles(): Observable<any[]> {
    return this.http.get<{ vehicles: any[] }>(`${this.baseUrl}/vehicles`).pipe(
      map(res => res.vehicles)
    );
  }

  // POST /vehicleData
  getVehicleData(vin: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/vehicleData`, { vin });
  }
}