import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material'
import { AlbumFormComponent } from './components/album-form.component'
import { ConfirmDialogComponent } from './components/confirm-dialog.component'
import { AddPhotosComponent } from './components/add-photos.component'
import { UserFormComponent } from './components/user-form.component'
import { AuthService } from '../auth/auth.service'
import { PhotosService } from './photos.service'
import { Photo } from './photo.model'
import { Album } from './album.model'
import { User } from './user.model'

@Injectable()
export class DialogsService {

  static width = '600px'

  constructor(
    private matDialog: MatDialog,
    private authService: AuthService,
    private photosService: PhotosService
  ) { }

  openAddAlbumDialog() {
    const config = {
      width: DialogsService.width,
      data: { title: 'Create new album' }
    }

    return this.matDialog.open(AlbumFormComponent, config)
  }

  openEditAlbumDialog({ name, description }: Album) {
    const config = {
      width: DialogsService.width,
      data: {
        title: 'Edit Album',
        values: { name, description }
      }
    }
    return this.matDialog.open(AlbumFormComponent, config)
  }

  openRemoveAlbumDialog() {
    const config = {
      width: DialogsService.width,
      data: { title: 'Remove album' }
    }
    return this.matDialog.open(ConfirmDialogComponent, config)
  }

  openAddPhotosDialog(albumId: string) {
    const config = {
      width: DialogsService.width,
      data: {
        url: this.photosService.createPhotoUrlForAlbum(albumId),
        headers: this.authService.headers
      }
    }

    return this.matDialog.open(AddPhotosComponent, config)
  }

  openEditPhotoDialog({ name, description }: Photo) {
    const config = {
      width: DialogsService.width,
      data: {
        title: 'Edit Photo',
        values: { name, description }
      }
    }

    return this.matDialog.open(AlbumFormComponent, config)
  }

  openEditUserDialog(user: User) {
    const config = {
      width: DialogsService.width,
      data: { user }
    }

    return this.matDialog.open(UserFormComponent, config)
  }
}
