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
        <img mat-card-image [src]="album.cover?.path || placeholderUrl" class="img">
        <mat-card-content>
          <h4 class="text-truncate">{{ album.name }}</h4>
          <p class="mat-caption">{{ album.photosCount }} photos</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['albums.component.scss']
})

export class AlbumsComponent implements OnInit {
  @Input() albums: any[]

  placeholderUrl = 'http://placehold.it/300/e6e6e6?text=No%20Image'

  constructor() { }

  ngOnInit() { }
}
