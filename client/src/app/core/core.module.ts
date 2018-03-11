import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { DropzoneModule } from 'ngx-dropzone-wrapper'
import { AngularMaterialModule } from '../angular-material.module'
import { AuthGuard } from '../auth/auth.guard'
import { HomePageComponent } from './containers/home-page.component'
import { UserPageComponent } from './containers/user-page.component'
import { UserHeaderComponent } from './components/user-header.component'
import { AlbumsComponent } from './components/albums.component'
import { AlbumPageComponent } from './containers/album-page.component'
import { AlbumHeaderComponent } from './components/album-header.component'
import { AlbumFormComponent } from './components/album-form.component'
import { PhotosComponent } from './components/photos.component'
import { AddPhotosComponent } from './components/add-photos.component'
import { ConfirmDialogComponent } from './components/confirm-dialog.component'
import { UserFormComponent } from './components/user-form.component'
import { UsersService } from './users.service'
import { AlbumsService } from './albums.service'
import { PhotosService } from './photos.service'
import { FilesizePipe } from './filesize.pipe'
import { MimetypePipe } from './mimetype.pipe'
import { LoggerService } from './logger.service'

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
    UserFormComponent,
    FilesizePipe,
    MimetypePipe
  ],
  entryComponents: [
    AlbumFormComponent,
    AddPhotosComponent,
    ConfirmDialogComponent,
    UserFormComponent
  ],
  providers: [
    UsersService,
    AlbumsService,
    PhotosService,
    {
      provide: LoggerService,
      useFactory: () => new LoggerService()
    }
  ],
})
export class CoreModule { }
