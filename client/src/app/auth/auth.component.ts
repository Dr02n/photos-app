import { Component } from '@angular/core'

@Component({
  selector: 'auth-component',
  template: `
    <div class="auth-page">
      <div class="container">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: calc(100vh - 64px);
      padding: 50px 0;
      box-sizing: border-box;
      background: #f9f9f9;
    }
  `]
})

export class AuthComponent {
  constructor() { }
}
