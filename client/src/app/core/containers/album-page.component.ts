import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { filter, switchMap, tap } from 'rxjs/operators'
import { Album } from '../album.model'
import { Photo } from '../photo.model'
import { AlbumsService } from '../albums.service'
import { PhotosService } from '../photos.service'
import { DialogsService } from '../dialogs.service'

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
    private albumsService: AlbumsService,
    private photosService: PhotosService,
    private dialogService: DialogsService
  ) { }

  get id() { return this.route.snapshot.paramMap.get('id') }

  ngOnInit() {
    this.albumsService.getAlbum(this.id).subscribe(album => this.album = album)
    this.photosService.getAlbumPhotos(this.id).subscribe(photos => this.photos = photos)
  }

  editAlbum() {
    this.dialogService.openEditAlbumDialog(this.album)
      .afterClosed()
      .pipe(filter(Boolean), switchMap((result) => this.albumsService.updateAlbum(this.id, result)))
      .subscribe(album => this.album = album)
  }

  removeAlbum() {
    this.dialogService.openRemoveAlbumDialog()
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => this.router.navigate(['users/me'])),
        switchMap((data) => this.albumsService.removeAlbum(this.id)))
      .subscribe()
  }

  addPhotos() {
    this.dialogService.openAddPhotosDialog(this.id)
      .componentInstance.photoAdded.subscribe(photo => this.photos.push(photo))
  }

  editPhoto(photo: Photo) {
    this.dialogService.openEditPhotoDialog(photo)
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((data) => this.photosService.editPhoto(photo._id, data)))
      .subscribe(newPhoto => this.photos = this.photos.map(p => p === photo ? newPhoto : p))
  }

  removePhoto(photo: Photo) {
    this.photos = this.photos.filter(p => p !== photo)
    this.photosService.removePhoto(photo._id).subscribe()
  }
}
