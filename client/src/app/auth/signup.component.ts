import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'signup',
  template: `
    <auth-form (success)="signup($event)">
      <h1>Create your account</h1>
      <button mat-raised-button color="primary">Create account</button>
      <p><a routerLink="/">Forgot password?</a></p>
      <p>Already have an account? <a routerLink="/auth/login">Log in</a> instead.</p>
    </auth-form>
  `
})

export class SignupComponent {
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  signup(formValue) {
    this.authService.signup(formValue)
      .subscribe(
        data => this.router.navigate(['/']),
        err => this.snackBar.open(err.error.error, null, { duration: 2000 })
      )
  }
}
