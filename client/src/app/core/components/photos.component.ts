import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-photos',
  template: `
    <div class="cards-container">
      <mat-card
        *ngFor="let photo of photos"
        class="card"
      >
        <img mat-card-image src="https://material.angular.io/assets/img/examples/shiba2.jpg">
        <mat-card-content>
          <h3>Photo {{ photo }}</h3>
        </mat-card-content>
        <mat-card-actions>
          <button mat-icon-button color="primary">
            <mat-icon>favorite</mat-icon>
          </button> 123
          <button mat-icon-button color="primary">
            <mat-icon>comment</mat-icon>
          </button> 123
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styleUrls: ['photos.component.scss']
})

export class PhotosComponent implements OnInit {
  @Input() photos: any[]

  constructor() { }

  ngOnInit() { }
}
