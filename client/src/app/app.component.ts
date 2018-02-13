import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Router, NavigationEnd } from '@angular/router'
import { AppState } from './state'
import { Logout } from './auth/store/auth.actions'
import { filter, map } from 'rxjs/operators'
import { User } from './auth/user.model'

@Component({
  selector: 'app-root',
  template: `
    <div class="mat-typography">
      <app-header
        [user]="user$ | async"
        [url]="url$ | async"
        (logout)="this.logout()"
      ></app-header>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent implements OnInit {
  user$: Observable<User>
  url$: Observable<string>

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.user$ = this.store.pipe(select(state => state.auth.status.user))

    this.url$ = this.router.events.pipe(
      filter(ev => ev instanceof NavigationEnd),
      map((ev: NavigationEnd) => ev.url)
    )
  }

  logout() {
    this.store.dispatch(new Logout())
  }
}
