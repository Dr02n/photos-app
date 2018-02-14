import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-albums',
  template: `
    <div class="cards-container">
      <mat-card
        *ngFor="let album of albums"
        [routerLink]="['/albums', album._id]"
        class="card"
      >
        <img mat-card-image src="https://material.angular.io/assets/img/examples/shiba2.jpg">
        <mat-card-content>
          <h3>{{ album.name }}</h3>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['albums.component.scss']
})

export class AlbumsComponent implements OnInit {
  @Input() albums: any[]

  constructor() { }

  ngOnInit() { }
}
