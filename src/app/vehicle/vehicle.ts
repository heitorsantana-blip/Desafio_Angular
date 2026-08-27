import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

interface Model {
  id: number;
  vehicle: string;
  volumetotal: number;
  connected: number;
  softwareUpdates: number;
  img: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './vehicle.html',
  styleUrl: './vehicle.css'
})
export class Vehicle implements OnInit {
  private apiService = inject(ApiService);

  sidebarOpen = false;
  userMenuOpen = false;

  vehicles: Model[] = [];
  selectedVehicleId: number | null = null;
  selectedVehicle: Model | null = null;

  // Lista de VINs disponíveis na API
  vinList: string[] = [
    '2FRHDUYS2Y63NHD22454',
    '2RFAASDY54E4HDU34874',
    '2FRHDUYS2Y63NHD22455',
    '2RFAASDY54E4HDU34875',
    '2FRHDUYS2Y63NHD22654',
    '2FRHDUYS2Y63NHD22854'
  ];
  selectedVin: string = '2FRHDUYS2Y63NHD22455';
  telemetryData: any = null;

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
      next: (res: any) => {
        this.vehicles = res.vehicles || [];
        if (this.vehicles.length > 0) {
          // Seleciona o Mustang por padrão se disponível, senão o primeiro
          const mustang = this.vehicles.find(v => v.vehicle === 'Mustang');
          this.selectedVehicle = mustang || this.vehicles[0];
          this.selectedVehicleId = this.selectedVehicle.id;
        }
      },
      error: (err) => console.error('Erro ao buscar veículos:', err)
    });
  }

  onVehicleSelect(): void {
    this.selectedVehicle = this.vehicles.find(v => v.id == this.selectedVehicleId) || null;
  }

  carregarDadosVin(): void {
    this.apiService.getVehicleData(this.selectedVin).subscribe({
      next: (res: any) => {
        this.telemetryData = res;
      },
      error: (err) => console.error('Erro ao buscar telemetria do VIN:', err)
    });
  }
}