import { Component, OnInit } from '@angular/core'
import { UsersService } from '../users.service'
import { AlbumsService } from '../albums.service'
import { Observable } from 'rxjs/Observable'
import { tap } from 'rxjs/operators/tap'
import { User } from '../user.model'
import { Album } from '../album.model'
import { MatDialog } from '@angular/material'
import { AlbumFormComponent } from './album-form.component'

@Component({
  selector: 'app-user-page',
  template: `
    <app-user-header [user]="user | async"></app-user-header>
    <div class="container">
      <div class="d-flex justify-between align-start">
        <h2>My albums</h2>
        <button mat-button (click)="addAlbum()">Add New +</button>
      </div>
      <app-albums [albums]="albums" *ngIf="albums; else loader"></app-albums>
      <ng-template #loader>
        <mat-progress-spinner mode="indeterminate" class="loader"></mat-progress-spinner>
      </ng-template>
    </div>
  `
})
export class UserPageComponent implements OnInit {
  user: Observable<User>
  albums: Album[]

  constructor(
    private matDialog: MatDialog,
    private userService: UsersService,
    private albumsService: AlbumsService
  ) { }

  ngOnInit() {
    this.user = this.userService.getMe()
      .pipe(
        tap(user => {
          this.albumsService.getUserAlbums(user._id)
            .subscribe(albums => this.albums = albums)
        })
      )
  }

  addAlbum() {
    this.matDialog
      .open(AlbumFormComponent, {
        width: '600px',
        data: { title: 'Create new album' }
      })
      .afterClosed().subscribe(result => {
        if (!result) { return }

        this.albumsService.createAlbum(result)
          .subscribe((album) => this.albums.push(album))
      })
  }
}
