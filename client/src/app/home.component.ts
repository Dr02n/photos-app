import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home',
  template: `
    <app-user></app-user>
    <div class="container">
      <div class="d-flex justify-between align-start">
        <h2>My albums</h2>
        <button mat-button (click)="addAlbum()">Add New +</button>
      </div>
      <app-albums></app-albums>
    </div>
  `
})

export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  addAlbum() {
    console.log('add album')
  }
}
