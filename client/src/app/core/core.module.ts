import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { DropzoneModule } from 'ngx-dropzone-wrapper'
import { AngularMaterialModule } from '../angular-material.module'
import { AuthGuard } from '../auth/auth.guard'

import { HomePageComponent } from './components/home-page.component'
import { UserPageComponent } from './components/user-page.component'
import { UserHeaderComponent } from './components/user-header.component'
import { AlbumsComponent } from './components/albums.component'
import { AlbumPageComponent } from './components/album-page.component'
import { AlbumHeaderComponent } from './components/album-header.component'
import { AlbumFormComponent } from './components/album-form.component'
import { PhotosComponent } from './components/photos.component'
import { AddPhotosComponent } from './components/add-photos.component'
import { ConfirmDialogComponent } from './components/confirm-dialog.component'

import { UsersService } from './users.service'
import { AlbumsService } from './albums.service'
import { PhotosService } from './photos.service'

import { FilesizePipe } from './filesize.pipe'
import { MimetypePipe } from './mimetype.pipe'

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserPageComponent, canActivate: [AuthGuard] },
  { path: 'albums/:id', component: AlbumPageComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    DropzoneModule,
    AngularMaterialModule
  ],
  exports: [],
  declarations: [
    HomePageComponent,
    UserPageComponent,
    UserHeaderComponent,
    AlbumPageComponent,
    AlbumHeaderComponent,
    AlbumFormComponent,
    AlbumsComponent,
    PhotosComponent,
    AddPhotosComponent,
    ConfirmDialogComponent,
    FilesizePipe,
    MimetypePipe
  ],
  entryComponents: [
    AlbumFormComponent,
    AddPhotosComponent,
    ConfirmDialogComponent
  ],
  providers: [
    UsersService,
    AlbumsService,
    PhotosService
  ],
})
export class CoreModule { }
