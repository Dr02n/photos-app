import { Component, OnInit, Inject } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-user-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
      <h2 mat-dialog-title>Edit profile</h2>
      <mat-dialog-content>
        <mat-form-field class="form-group">
          <input matInput placeholder="Name" formControlName="name" required>
          <mat-error *ngIf="name.hasError('required')">
            Name is required
          </mat-error>
        </mat-form-field>
        <mat-form-field class="form-group">
          <input matInput placeholder="Bio" formControlName="bio">
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button color="primary" [disabled]="form.touched && form.invalid">Submit</button>
        <button mat-button mat-dialog-close>Close</button>
      </mat-dialog-actions>
    </form>
  `
})
export class UserFormComponent implements OnInit {
  form: FormGroup

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      bio: ''
    })
  }

  ngOnInit() { }

  get name() { return this.form.get('name') }

  onSubmit() {
    if (this.form.valid) { this.dialogRef.close(this.form.value) }
  }
}
