import { Component } from '@angular/core'
import { switchMap } from 'rxjs/operators/switchMap'
import { concat } from 'rxjs/observable/concat'
import { Subject } from 'rxjs/Subject'
import { of } from 'rxjs/observable/of'
import { map } from 'rxjs/operators/map'
import { AuthService } from '../auth.service'

@Component({
  selector: 'login-page',
  template: `
    <auth-form
      (submitted)="login($event)"
      [errorMessage]="error$ | async"
      [pending]="authService.pending"
    >
      <h1 class="text-center">Log in</h1>
      <span>Log in</span>
      <p><a routerLink="/">Forgot password?</a></p>
      <p>Don't have an account yet? <a routerLink="/auth/signup">Sign up now!</a></p>
    </auth-form>
  `
})

export class LoginComponent {
  requests = new Subject<any>()
  error$ = this.requests.pipe(
    switchMap(data => concat(of(null), this.authService.login(data).pipe(map(result => result.error))))
  )

  constructor(private authService: AuthService) { }

  login(formValue) {
    this.requests.next(formValue)
  }
}
