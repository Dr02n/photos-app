import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-albums',
  template: `
    <div class="albums-container">
      <mat-card *ngFor="let album of albums" class="album-card">
        <img mat-card-image src="https://material.angular.io/assets/img/examples/shiba2.jpg">
        <mat-card-content>
          <h3>Album {{ album }}</h3>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['albums.component.scss']
})

export class AlbumsComponent implements OnInit {
  @Input() albums: any[] = [1, 2, 3, 4, 5]

  constructor() { }

  ngOnInit() { }
}
