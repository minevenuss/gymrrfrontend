import {Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-auth-layout',
    standalone: true,
    imports: [RouterOutlet],
    template: `
    <div class="auth-layout">
      <div class="auth-card">
        <router-outlet />
      </div>
    </div>
  `,
  styles: [`
    .auth-layout {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .auth-card {
      background: white;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      min-width: 400px;
    }
  `]
})
export class AuthLayoutComponent {}