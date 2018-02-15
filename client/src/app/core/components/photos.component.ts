import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Photo } from '../photo.model'

@Component({
  selector: 'app-photos',
  template: `
    <div class="cards-container">
      <mat-card *ngFor="let photo of photos" class="card">
        <img mat-card-image [src]="photo.path" class="img">
        <mat-card-content>
          <h4 class="text-truncate">{{ photo.name }}</h4>
          <p class="mat-caption">
            {{ photo.createdAt | date }} &middot; {{ photo.size | filesize }} &middot; {{ photo.mimetype | mimetype }}
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button (click)="edit.emit(photo)">Edit</button>
          <button mat-button color="warn" (click)="remove.emit(photo)">Remove</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styleUrls: ['photos.component.scss']
})

export class PhotosComponent implements OnInit {
  @Input() photos: Photo[]

  @Output() remove = new EventEmitter<Photo>()
  @Output() edit = new EventEmitter<Photo>()

  constructor() { }

  ngOnInit() { }
}
