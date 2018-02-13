import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'auth-form',
  template: `
    <mat-card class="col-sm-4 col-sm-offset-4">
      <mat-card-content>
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
          <p *ngIf="errorMessage" style="color: red">{{errorMessage}}</p>
          <button mat-raised-button color="primary" [disabled]="pending || form.touched && form.invalid">
            <ng-content select="span"></ng-content>
          </button>
        </form>
      </mat-card-content>
      <ng-content select="p"></ng-content>
    </mat-card>
  `
})
export class AuthFormComponent implements OnInit {
  form: FormGroup

  @Input() pending: boolean
  @Input() errorMessage: string | null

  @Output() submitted: EventEmitter<any> = new EventEmitter()

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get email() { return this.form.get('email') }

  get password() { return this.form.get('password') }

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value)
    }
  }
}
