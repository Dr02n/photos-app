import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material'
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
    private matDialog: MatDialog,
    private userService: UsersService,
    private albumsService: AlbumsService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.userService.getUser(id).subscribe(user => this.user = user)
    this.albumsService.getUserAlbums(id).subscribe(albums => this.albums = albums)
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

  editUser() {
    this.matDialog
      .open(UserFormComponent, {
        width: '600px',
        data: { user: this.user }
      })
      .afterClosed().subscribe(result => {
        if (!result) { return }
        console.log(result)
      })
  }
}
