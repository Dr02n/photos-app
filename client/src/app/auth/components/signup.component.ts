import { Component } from '@angular/core'
// import { MatSnackBar } from '@angular/material'

import { Store } from '@ngrx/store'
import { AppState } from '../../state'
import { Signup } from '../store/auth.actions'

@Component({
  selector: 'signup-page',
  template: `
    <auth-form (success)="signup($event)">
      <h1 class="text-center">Create your account</h1>
      <button mat-raised-button color="primary">Create account</button>
      <p>Already have an account? <a routerLink="/auth/login">Log in</a> instead.</p>
    </auth-form>
  `
})

export class SignupComponent {
  constructor(
    private store: Store<AppState>,
    // private snackBar: MatSnackBar
  ) { }

  signup(formValue) {
    this.store.dispatch(new Signup(formValue))
  }
}
