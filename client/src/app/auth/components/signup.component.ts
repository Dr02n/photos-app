import { Component, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { AppState } from '../../state'
import { Signup, ResetViewState } from '../store/auth.actions'

@Component({
  selector: 'signup-page',
  template: `
    <auth-form
      (submitted)="signup($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async"
    >
      <h1 class="text-center">Create your account</h1>
      <span>Create account</span>
      <p>Already have an account? <a routerLink="/auth/login">Log in</a> instead.</p>
    </auth-form>
  `
})

export class SignupComponent implements OnDestroy {
  pending$ = this.store.pipe(select('auth'), select('view'), select('pending'))
  error$ = this.store.pipe(select('auth'), select('view'), select('error'))

  constructor(private store: Store<AppState>, ) { }

  ngOnDestroy() {
    this.store.dispatch(new ResetViewState())
  }

  signup(formValue) {
    this.store.dispatch(new Signup(formValue))
  }
}
