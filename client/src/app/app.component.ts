import { Component } from '@angular/core'
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  template: `
    <div class="mat-typography">
      <app-header
        [user]="authService.user"
        (logout)="authService.logout()"
      ></app-header>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  constructor(private authService: AuthService) { }
}
