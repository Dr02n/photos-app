import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError } from 'rxjs/operators/catchError'
import { BaseService } from './base.service'
import { AuthService } from '../auth/auth.service'
import { Photo } from './photo.model'

@Injectable()
export class PhotosService extends BaseService {

  constructor(private http: HttpClient, authService: AuthService) {
    super(authService.token.value)
  }

  getLatestPhotos() {
    // TBD
  }

  getAlbumPhotos(albumId: string) {
    return this.http.get<Photo[]>(`/api/albums/${albumId}/photos`, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  getPhotosUrl(albumId: string) {
    return `/api/albums/${albumId}/photos`
  }
}
