import { Component } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { User } from './auth/auth.reducer'
import { AuthService } from './auth/auth.service'
import { AppState } from './state'

@Component({
  selector: 'app-root',
  template: `
    <div class="mat-typography">
      <app-header
        [user]="user$ | async"
        (logout)="authService.logout()"
      ></app-header>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  user$: Observable<User>

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    this.user$ = store.pipe(select('auth'), select('user'))
  }
}
