import { Component } from '@angular/core'
import { AuthService } from '../auth.service'

@Component({
  selector: 'login-page',
  template: `
    <auth-form
      (submitted)="login($event)"
      [errorMessage]="error"
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
  error: string

  constructor(private authService: AuthService) { }

  login(formValue) {
    this.error = null
    this.authService.login(formValue)
      .subscribe(
        () => {},
        err => this.error = err
      )
  }
}
