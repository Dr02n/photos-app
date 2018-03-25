import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { filter, switchMap } from 'rxjs/operators'
import { UsersService } from '../users.service'
import { AlbumsService } from '../albums.service'
import { DialogsService } from '../dialogs.service'
import { User } from '../user.model'
import { Album } from '../album.model'

@Component({
  selector: 'app-user-page',
  template: `
    <div *ngIf="user && albums; else loader">
      <app-user-header [user]="user">
        <button mat-button (click)="editUser()">Edit</button>
      </app-user-header>
      <div class="container">
        <div class="d-flex justify-between align-start">
          <h2>My albums</h2>
          <button mat-button (click)="addAlbum()">Add New +</button>
        </div>
        <app-albums [albums]="albums"></app-albums>
      </div>
    </div>
    <ng-template #loader>
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </ng-template>
  `
})
export class UserPageComponent implements OnInit {
  user: User
  albums: Album[]

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private albumsService: AlbumsService,
    private dialogService: DialogsService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.userService.getUser(id).subscribe(user => this.user = user)
    this.albumsService.getUserAlbums(id).subscribe(albums => this.albums = albums)
  }

  addAlbum() {
    this.dialogService.openAddAlbumDialog()
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(data => this.albumsService.createAlbum(data)))
      .subscribe((album) => this.albums.push(album))
  }

  editUser() {
    this.dialogService.openEditUserDialog(this.user)
      .afterClosed()
      .pipe(
        filter(Boolean))
      .subscribe(result => { console.log(result) })
  }
}
