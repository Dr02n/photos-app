import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-add-photos',
  template: `
    <h2 mat-dialog-title>Add photos</h2>
    <mat-dialog-content>
      Potos dropzone
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `
})

export class AddPhotosComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
    console.log(this.data)
   }
}
