import { Component } from '@angular/core'
import { AuthService } from '../auth.service'
import { Subject } from 'rxjs/Subject'
import { switchMap } from 'rxjs/operators/switchMap'
import { map } from 'rxjs/operators/map'
import { of } from 'rxjs/observable/of'
import { concat } from 'rxjs/observable/concat'

@Component({
  selector: 'signup-page',
  template: `
    <auth-form
      (success)="signup($event)"
      [errorMessage]="error$ | async"
    >
      <h1 class="text-center">Create your account</h1>
      <button mat-raised-button color="primary" [disabled]="authService.pending">Create account</button>
      <p>Already have an account? <a routerLink="/auth/login">Log in</a> instead.</p>
    </auth-form>
  `
})

export class SignupComponent {
  requests = new Subject<any>()
  error$ = this.requests.pipe(
    switchMap(data => concat(of(null), this.authService.signup(data).pipe(map(result => result.error))))
  )

  constructor(private authService: AuthService) { }

  signup(formValue) {
    this.requests.next(formValue)
  }
}
