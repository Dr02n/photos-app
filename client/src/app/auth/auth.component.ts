import { Component } from '@angular/core';

@Component({
  selector: 'auth-component',
  template: `
    <div class="auth-page">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: calc(100vh - 64px);
      padding-top: 50px;
      box-sizing: border-box;
      background: #f9f9f9;
    }
  `]
})

export class AuthComponent {
  constructor() { }
}