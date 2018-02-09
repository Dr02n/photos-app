import { Component, Output, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'auth-form',
  template: `
    <mat-card class="col-sm-4 col-sm-offset-4">
      <ng-content select="h1"></ng-content>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
        <mat-form-field class="form-group">
          <input matInput placeholder="Email" formControlName="email" required>
          <mat-error *ngIf="email.hasError('required')">
            Email is required
          </mat-error>
          <mat-error *ngIf="email.hasError('email') && !email.hasError('required')">
            Please enter a valid email address
          </mat-error>
        </mat-form-field>
        <mat-form-field class="form-group">
          <input matInput placeholder="Password" formControlName="password" required>
          <mat-error *ngIf="password.hasError('required')">
            Password is required
          </mat-error>
        </mat-form-field>
        <div class="form-group">
          <ng-content select="button"></ng-content>
        </div>
      </form>
      <ng-content select="p"></ng-content>
    </mat-card>
  `
})
export class AuthFormComponent {
  form: FormGroup

  @Output() success: EventEmitter<any> = new EventEmitter()

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get email() { return this.form.get('email') }

  get password() { return this.form.get('password') }

  onSubmit() {
    if (this.form.valid) {
      this.success.emit(this.form.value)
    }
  }
}
