import { Component } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { AppState } from '../../state'
import { Login } from '../store/auth.actions'

@Component({
  selector: 'login-page',
  template: `
    <auth-form
      (success)="login($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async"
    >
      <h1 class="text-center">Log in</h1>
      <button mat-raised-button color="primary" [disabled]="pending$ | async">Log in</button>
      <p><a routerLink="/">Forgot password?</a></p>
      <p>Don't have an account yet? <a routerLink="/auth/signup">Sign up now!</a></p>
    </auth-form>
  `
})

export class LoginComponent {
  pending$ = this.store.pipe(select('auth'), select('pending'))
  error$ = this.store.pipe(select('auth'), select('error'))

  constructor(private store: Store<AppState>) { }

  login(formValue) {
    this.store.dispatch(new Login(formValue))
  }
}
