import { Component, OnInit } from '@angular/core'
import { AuthService } from './auth/auth.service'
import { Router, NavigationEnd } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { filter } from 'rxjs/operators/filter'
import { map } from 'rxjs/operators/map'

@Component({
  selector: 'app-root',
  template: `
    <div class="mat-typography">
      <app-header
        [user]="authService.user"
        [url]="url$ | async"
        (logout)="logout()"
      ></app-header>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent implements OnInit {
  url$: Observable<string>

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.url$ = this.router.events.pipe(
      filter(ev => ev instanceof NavigationEnd),
      map((ev: NavigationEnd) => ev.url)
    )
  }

  logout() {
    this.authService.logout()
  }
}
