import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-album-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
      <h2 mat-dialog-title>{{ title }}</h2>
      <mat-dialog-content>
        <mat-form-field class="form-group">
          <input matInput placeholder="Name" formControlName="name" required>
          <mat-error *ngIf="name.hasError('required')">
            Name is required
          </mat-error>
        </mat-form-field>
        <mat-form-field class="form-group">
          <input matInput placeholder="Description" formControlName="description">
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button color="primary" [disabled]="form.touched && form.invalid">Submit</button>
        <button mat-button mat-dialog-close type="button">Cancel</button>
      </mat-dialog-actions>
    </form>
  `
})
export class AlbumFormComponent implements OnInit {
  form: FormGroup

  constructor(
    private dialogRef: MatDialogRef<AlbumFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      description: ''
    })
  }

  get title() { return this.data.title }

  get name() { return this.form.get('name') }

  ngOnInit() {
    if (this.data.values) { this.form.patchValue(this.data.values) }
  }

  onSubmit() {
    if (this.form.valid) { this.dialogRef.close(this.form.value) }
  }
}
