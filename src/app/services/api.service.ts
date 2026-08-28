import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Usuario } from '../models/user.model';
import { Veiculo, TelemetriaVeiculo } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3001';

  login(nome: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/login`, { nome, senha });
  }

  getVehicles(): Observable<Veiculo[]> {
    return this.http.get<{ vehicles: Veiculo[] }>(`${this.baseUrl}/vehicles`).pipe(
      map(res => res.vehicles)
    );
  }

  getVehicleData(vin: string): Observable<TelemetriaVeiculo> {
    return this.http.post<TelemetriaVeiculo>(`${this.baseUrl}/vehicleData`, { vin });
  }
}