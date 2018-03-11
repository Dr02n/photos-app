import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material'
import { Observable } from 'rxjs/Observable'
import { filter, switchMap } from 'rxjs/operators'

import { UsersService } from '../users.service'
import { AlbumsService } from '../albums.service'
import { User } from '../user.model'
import { Album } from '../album.model'
import { AlbumFormComponent } from '../components/album-form.component'
import { UserFormComponent } from '../components/user-form.component'

@Component({
  selector: 'app-user-page',
  template: `
    <div *ngIf="user && albums; else loader">
      <app-user-header [user]="user | async">
        <button mat-button (click)="editUser()">Edit</button>
      </app-user-header>
      <div class="container">
        <div class="d-flex justify-between align-start">
          <h2>My albums</h2>
          <button mat-button (click)="addAlbum()">Add New +</button>
        </div>
        <app-albums [albums]="albums | async"></app-albums>
      </div>
    </div>
    <ng-template #loader>
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </ng-template>
  `
})
export class UserPageComponent implements OnInit {
  user: Observable<User>
  albums: Observable<Album[]>

  constructor(
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private userService: UsersService,
    private albumsService: AlbumsService
  ) {
    this.user = userService.currentUser
    this.albums = userService.currentUserAlbums
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.userService.getUser(id).subscribe()
    this.userService.getUserAlbums(id).subscribe()
  }

  addAlbum() {
    this.matDialog
      .open(AlbumFormComponent, {
        width: '600px',
        data: { title: 'Create new album' }
      })
      .afterClosed()
      .pipe(
        filter(result => !!result),
        switchMap(result => this.albumsService.createAlbum(result))
      )
      .subscribe()
  }

  editUser() {
    this.matDialog
      .open(UserFormComponent, {
        width: '600px',
        data: { user: this.user }
      })
      .afterClosed()
      .pipe(
        filter(result => !!result)
      )
      .subscribe(result => { console.log(result) }) // TODO
  }
}
