import { Component } from '@angular/core'
import { AuthService } from '../auth.service'

@Component({
  selector: 'signup-page',
  template: `
    <auth-form
      (submitted)="signup($event)"
      [errorMessage]="error"
      [pending]="authService.pending"
    >
      <h1 class="text-center">Create your account</h1>
      <span>Create account</span>
      <p>Already have an account? <a routerLink="/auth/login">Log in</a> instead.</p>
    </auth-form>
  `
})

export class SignupComponent {
  error: string

  constructor(private authService: AuthService) { }

  signup(formValue) {
    this.error = null
    this.authService.signup(formValue)
      .subscribe(
        () => {},
        err => this.error = err
      )
  }
}
