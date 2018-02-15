import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError } from 'rxjs/operators/catchError'
import { BaseService } from './base.service'
import { AuthService } from '../auth/auth.service'
import { Photo } from './photo.model'

@Injectable()
export class PhotosService extends BaseService {

  private photosUrl = '/api/photos'

  constructor(private http: HttpClient, authService: AuthService) {
    super(authService.headers)
  }

  getPhotos() {
    return this.http.get<Photo[]>(this.photosUrl, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  getAlbumPhotos(albumId: string) {
    return this.http.get<Photo[]>(`/api/albums/${albumId}/photos`, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  addPhotosUrl(albumId: string) {
    return `/api/albums/${albumId}/photos`
  }

  editPhoto(id: string, data: { name: string, description: string }) {
    return this.http.patch<Photo>(`${this.photosUrl}/${id}`, data, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  removePhoto(id: string) {
    return this.http.delete<any>(`${this.photosUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError))
  }
}
