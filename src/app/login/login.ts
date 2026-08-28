import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

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
  private authService = inject(AuthService);

  nome: string = '';
  senha: string = '';
  erro: string = '';

  fazerLogin(): void {
  this.apiService.login(this.nome, this.senha).subscribe({
    next: (usuario) => {
      this.authService.salvarSessao(usuario); // Salva a sessão no localStorage
      this.router.navigate(['/dashboard']);
    },
    error: (err) => console.error('Erro no login:', err)
  });
  }
}
