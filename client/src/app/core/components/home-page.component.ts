import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home-page',
  template: `
    <div class="container">
      <h2>Latest Photos</h2>
      <app-photos [photos]="photos"></app-photos>
    </div>
  `,
  styles: [`
    .container {
      padding-top: 24px;
    }
  `]
})

export class HomePageComponent implements OnInit {
  photos = []

  constructor() { }

  ngOnInit() { }
}
