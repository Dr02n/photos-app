import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material'
import { AlbumsService } from '../albums.service'
import { Album } from '../album.model'
import { Photo } from '../photo.model'
import { PhotosService } from '../photos.service'
import { AlbumFormComponent } from './album-form.component'
import { AddPhotosComponent } from './add-photos.component'

@Component({
  selector: 'app-album-page',
  template: `
    <app-album-header [album]="album">
      <button mat-button (click)="editAlbum()">Edit</button>
    </app-album-header>
    <div class="container">
      <div class="d-flex justify-between align-start">
        <h2>Photos</h2>
        <button mat-button (click)="addPhotos()">Add Photos +</button>
      </div>
      <app-photos [photos]="photos" *ngIf="photos; else loader"></app-photos>
      <ng-template #loader>
        <mat-progress-spinner mode="indeterminate" class="loader"></mat-progress-spinner>
      </ng-template>
    </div>
  `,
})

export class AlbumPageComponent implements OnInit {
  album: Album
  photos: Photo[]

  constructor(
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private albumsService: AlbumsService,
    private photosService: PhotosService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.albumsService.getAlbum(id).subscribe(album => this.album = album)
    this.photosService.getAlbumPhotos(id).subscribe(photos => this.photos = photos)
  }

  editAlbum() {
    const { name, description } = this.album
    const id = this.route.snapshot.paramMap.get('id')

    this.matDialog
      .open(AlbumFormComponent, {
        width: '600px',
        data: {
          title: 'Edit Album',
          values: { name, description }
        }
      })
      .afterClosed().subscribe(result => {
        if (!result) { return }
        this.albumsService.updateAlbum(id, result).subscribe(album => this.album = album)
      })
  }

  addPhotos() {
    const id = this.route.snapshot.paramMap.get('id')

    this.matDialog
      .open(AddPhotosComponent, {
        width: '600px',
        data: {
          url: this.photosService.getPhotosUrl(id)
        }
      })
  }
}
