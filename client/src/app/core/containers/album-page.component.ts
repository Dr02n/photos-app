import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MatDialog } from '@angular/material'
import { Observable } from 'rxjs/Observable'
import { switchMap, filter, tap } from 'rxjs/operators'

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
    <div *ngIf="album else loader">
      <app-album-header [album]="album">
        <button mat-button (click)="editAlbum()">Edit</button>
        <button mat-button color="warn" (click)="removeAlbum()">Remove</button>
        <pre>
          {{ album | json }}
        </pre>
      </app-album-header>
      <div class="container">
        <div class="d-flex justify-between align-start">
          <h2>Photos</h2>
          <button mat-button (click)="addPhotos()">Add Photos +</button>
        </div>
        <app-photos
          [photos]="photos | async"
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

export class AlbumPageComponent implements OnInit, OnDestroy {
  album: Album
  photos: Observable<Photo[]>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
    private albumsService: AlbumsService,
    private photosService: PhotosService,
    private authService: AuthService
  ) {
    albumsService.currentAlbum.subscribe(album => this.album = album)
    this.photos = albumsService.currentAlbumPhotos
  }

  get id() { return this.route.snapshot.paramMap.get('id') }

  ngOnInit() {
    this.albumsService.setCurrentAlbumId(this.id)
    this.albumsService.getAlbumPhotos(this.id).subscribe()
  }

  ngOnDestroy() {
    this.albumsService.setCurrentAlbumId(null)
  }

  editAlbum() {
    const { name, description } = this.album
    const config = {
      width: '600px',
      data: {
        title: 'Edit Album',
        values: { name, description }
      }
    }

    this.matDialog
      .open(AlbumFormComponent, config)
      .afterClosed()
      .pipe(
        filter(result => !!result),
        switchMap(result => this.albumsService.updateAlbum(this.id, result))
      )
      .subscribe()
  }

  removeAlbum() {
    const config = {
      width: '600px',
      data: {
        title: 'Remove album'
      }
    }

    this.matDialog
      .open(ConfirmDialogComponent, config)
      .afterClosed()
      .pipe(
        filter(result => !!result),
        tap(() => this.router.navigate(['users/me'])),
        switchMap(result => this.albumsService.deleteAlbum(this.id))
      )
      .subscribe()
  }

  addPhotos() {
    const config = {
      width: '600px',
      data: {
        url: this.photosService.createPhotoUrlForAlbum(this.id),
        headers: this.authService.headers
      }
    }

    this.matDialog
      .open(AddPhotosComponent, config)
      .componentInstance.photoAdded
      .subscribe(data => this.photosService.addPhotos(new Photo(data)))
  }

  editPhoto(photo: Photo) {
    const { name, description } = photo
    const config = {
      width: '600px',
      data: {
        title: 'Edit Photo',
        values: { name, description }
      }
    }

    this.matDialog
      .open(AlbumFormComponent, config)
      .afterClosed()
      .pipe(
        filter(result => !!result),
        switchMap(result => this.photosService.editPhoto(photo._id, result))
      )
      .subscribe()
  }

  removePhoto(photo: Photo) {
    this.photosService.removePhoto(photo._id).subscribe()
  }
}
