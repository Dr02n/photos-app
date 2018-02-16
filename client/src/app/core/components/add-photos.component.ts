import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { Photo } from '../photo.model'

@Component({
  selector: 'app-add-photos',
  template: `
    <h2 mat-dialog-title>Add photos</h2>
    <mat-dialog-content>
      <div
        class="dropzone"
        [dropzone]="config"
        (sending)="onSending($event)"
        (success)="onUploadSuccess($event)"
      ></div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close [disabled]="!!pendingRequests">Close</button>
    </mat-dialog-actions>
  `
})
export class AddPhotosComponent implements OnInit {
  pendingRequests = 0

  @Output() photoAdded = new EventEmitter<Photo>()

  constructor(
    private dialogRef: MatDialogRef<AddPhotosComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  get config() {
    const { url, headers } = this.data

    return {
      url,
      headers,
      paramName: 'photo',
      acceptedFiles: 'image/*'
    }
  }

  ngOnInit() { }

  onSending([file, request, data]: [File, XMLHttpRequest, FormData]) {
    this.pendingRequests += 1
    if (!this.dialogRef.disableClose) { this.dialogRef.disableClose = true }
  }

  onUploadSuccess([file, response, event]: [File, Photo, ProgressEvent]) {
    this.photoAdded.emit(response)
    this.pendingRequests -= 1
    if (!this.pendingRequests) { this.dialogRef.disableClose = false }
  }
}
