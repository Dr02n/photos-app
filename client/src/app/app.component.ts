import { Component } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { AppState } from './state'
import { User } from './auth/interfaces'
import { Logout } from './auth/store/auth.actions'

@Component({
  selector: 'app-root',
  template: `
    <div class="mat-typography">
      <app-header
        [user]="user$ | async"
        (logout)="this.logout()"
      ></app-header>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  user$: Observable<User>

  constructor(private store: Store<AppState>) {
    this.user$ = store.pipe(select('auth'), select('user'))
  }

  logout() {
    this.store.dispatch(new Logout())
  }
}
