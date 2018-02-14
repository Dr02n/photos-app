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
  photos = [1, 2, 3, 4, 5, 6]

  constructor() { }

  ngOnInit() { }
}
