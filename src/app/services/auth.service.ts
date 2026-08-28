import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Usuario } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  salvarSessao(usuario: Usuario): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('usuario_logado', JSON.stringify(usuario));
    }
  }

  obterUsuario(): Usuario | null {
    if (isPlatformBrowser(this.platformId)) {
      const dados = localStorage.getItem('usuario_logado');
      return dados ? JSON.parse(dados) : null;
    }
    return null;
  }

  estaLogado(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('usuario_logado');
    }
    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('usuario_logado');
    }
    this.router.navigate(['/']);
  }
}