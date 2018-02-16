import { Component, OnInit } from '@angular/core'
import { Photo } from '../photo.model'
import { PhotosService } from '../photos.service'

@Component({
  selector: 'app-home-page',
  template: `
    <div class="container" *ngIf="photos; else loader">
      <h2>Latest Photos</h2>
      <app-photos [photos]="photos"></app-photos>
    </div>
    <ng-template #loader>
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </ng-template>
  `,
  styles: [`
    .container {
      padding-top: 24px;
    }
  `]
})

export class HomePageComponent implements OnInit {
  photos: Photo[]

  constructor(private photosService: PhotosService) { }

  ngOnInit() {
    this.photosService.getPhotos().subscribe(photos => this.photos = photos)
  }
}
