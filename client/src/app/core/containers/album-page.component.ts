import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MatDialog } from '@angular/material'
import { Album } from '../album.model'
import { Photo } from '../photo.model'
import { AlbumsService } from '../albums.service'
import { PhotosService } from '../photos.service'
import { AuthService } from '../../auth/auth.service'
import { AlbumFormComponent } from '../components/album-form.component'
import { AddPhotosComponent } from '../components/add-photos.component'
import { ConfirmDialogComponent } from '../components/confirm-dialog.component'

@Component({
  selector: 'app-album-page',
  template: `
    <div *ngIf="album && photos; else loader">
      <app-album-header [album]="album">
        <button mat-button (click)="editAlbum()">Edit</button>
        <button mat-button color="warn" (click)="removeAlbum()">Remove</button>
      </app-album-header>
      <div class="container">
        <div class="d-flex justify-between align-start">
          <h2>Photos</h2>
          <button mat-button (click)="addPhotos()">Add Photos +</button>
        </div>
        <app-photos
          [photos]="photos"
          (remove)="removePhoto($event)"
          (edit)="editPhoto($event)"
        ></app-photos>
      </div>
    </div>
    <ng-template #loader>
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </ng-template>
  `,
})

export class AlbumPageComponent implements OnInit {
  album: Album
  photos: Photo[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
    private albumsService: AlbumsService,
    private photosService: PhotosService,
    private authService: AuthService
  ) { }

  get id() { return this.route.snapshot.paramMap.get('id') }

  ngOnInit() {
    this.albumsService.getAlbum(this.id).subscribe(album => this.album = album)
    this.photosService.getAlbumPhotos(this.id).subscribe(photos => this.photos = photos)
  }

  editAlbum() {
    const { name, description } = this.album

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
        this.albumsService.updateAlbum(this.id, result).subscribe(album => this.album = album)
      })
  }

  removeAlbum() {
    this.matDialog
      .open(ConfirmDialogComponent, {
        width: '600px',
        data: {
          title: 'Remove album'
        }
      })
      .afterClosed().subscribe(result => {
        if (!result) { return }
        this.albumsService.removeAlbum(this.id).subscribe(() => this.router.navigate(['users/me']))
      })
  }

  addPhotos() {
    this.matDialog
      .open(AddPhotosComponent, {
        width: '600px',
        data: {
          url: this.photosService.addPhotosUrl(this.id),
          headers: this.authService.headers
        }
      })
      .componentInstance.photoAdded.subscribe(photo => this.photos.push(photo))
  }

  editPhoto(photo: Photo) {
    const { name, description } = photo

    this.matDialog
      .open(AlbumFormComponent, {
        width: '600px',
        data: {
          title: 'Edit Photo',
          values: { name, description }
        }
      })
      .afterClosed().subscribe(result => {
        if (!result) { return }
        this.photosService.editPhoto(photo._id, result)
          .subscribe(newPhoto => this.photos = this.photos.map(el => el._id === newPhoto._id ? newPhoto : el))
      })
  }

  removePhoto(photo: Photo) {
    this.photosService.removePhoto(photo._id)
      .subscribe(() => this.photos = this.photos.filter(({ _id }) => _id !== photo._id))
  }
}
