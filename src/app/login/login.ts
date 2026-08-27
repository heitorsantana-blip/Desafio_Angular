import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private apiService = inject(ApiService);
  private router = inject(Router);

  nome: string = '';
  senha: string = '';
  erro: string = '';

  fazerLogin() {
    this.apiService.login(this.nome, this.senha).subscribe({
      next: (resposta) => {
        console.log('Login realizado com sucesso:', resposta);
        
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.erro = err.error?.message || 'Falha ao autenticar.';
      }
    });
  }
}
