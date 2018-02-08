import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User } from './auth/auth.reducer';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="mat-typography">
      <app-header [user]="user$ | async" (logout)="onLogout()"></app-header>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  user$: Observable<User>

  constructor(
    private store: Store<any>,
    private authService: AuthService
  ) {
    this.user$ = store.pipe(select('auth'), select('user'))
  }

  onLogout() {
    this.authService.logout()
  }
}
