import { Component } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { Router } from '@angular/router'

import { AuthService } from './auth.service'

@Component({
  selector: 'login-page',
  template: `
    <auth-form (success)="login($event)">
      <h1>Log in</h1>
      <button mat-raised-button color="primary">Log in</button>
      <p>Don't have an account yet? <a routerLink="/auth/signup">Sign up now!</a></p>
    </auth-form>
  `
})

export class LoginComponent {
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  login(formValue) {
    this.authService.login(formValue)
      .subscribe(
        data => this.router.navigate(['/']),
        err => this.snackBar.open('Email or password is invalid', null, { duration: 2000 })
      )
  }
}
