import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Veiculo, TelemetriaVeiculo } from '../models/vehicle.model';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './vehicle.html',
  styleUrls: ['./vehicle.css']
})
export class Vehicle implements OnInit {
  private apiService = inject(ApiService);

  sidebarOpen: boolean = false;
  userMenuOpen: boolean = false;

  vehicles: Veiculo[] = [];
  selectedVehicleId: number | null = null;
  selectedVehicle: Veiculo | null = null;

  selectedVin: string = '';
  telemetryData: TelemetriaVeiculo | null = null;

  ngOnInit(): void {
    this.carregarVeiculos();
    this.carregarDadosVin();
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  carregarVeiculos(): void {
    this.apiService.getVehicles().subscribe({
      next: (res) => {
        this.vehicles = res;
        if (this.vehicles && this.vehicles.length > 0) {
          this.selectedVehicleId = this.vehicles[0].id;
          this.selectedVehicle = this.vehicles[0];
        }
      },
      error: (err) => console.error('Erro ao buscar veículos:', err)
    });
  }

  onVehicleSelect(): void {
    this.selectedVehicle = this.vehicles.find(
      (v) => String(v.id) === String(this.selectedVehicleId)
    ) || null;
  }

  carregarDadosVin(): void {
    const vin = this.selectedVin?.trim();
    
    if (!vin) {
      this.telemetryData = null;
      return;
    }

    this.apiService.getVehicleData(vin).subscribe({
      next: (res) => {
        this.telemetryData = res;
      },
      error: (err) => {
        console.error('Erro ou VIN não encontrado:', err);
        this.telemetryData = null;
      }
    });
  }
}