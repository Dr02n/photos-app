import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auth-form',
  templateUrl: 'auth-form.component.html'
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

  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }

  onSubmit() {
    if (this.form.valid) {
      this.success.emit(this.form.value)
    }
  }
}