import { Component, OnInit, Inject, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material'
import { Photo } from '../photo.model'

@Component({
  selector: 'app-add-photos',
  template: `
    <h2 mat-dialog-title>Add photos</h2>
    <mat-dialog-content>
      <div class="dropzone" [dropzone]="config" (success)="onUploadSuccess($event)"></div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `
})

export class AddPhotosComponent implements OnInit {
  @ViewChild('dropzone') dropzone: ElementRef

  @Output() photoAdded = new EventEmitter<Photo>()

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  get config() {
    return {
      url: this.data.url,
      headers: this.data.headers,
      paramName: 'photo',
      acceptedFiles: 'image/*'
    }
  }

  ngOnInit() { }

  onUploadSuccess([file, response, event]: [File, Photo, ProgressEvent]) {
    this.photoAdded.emit(response)
  }
}
