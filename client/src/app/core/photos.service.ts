import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { catchError } from 'rxjs/operators/catchError'
import { Subject } from 'rxjs/Subject'
import { scan, map, startWith, publishReplay, refCount, tap } from 'rxjs/operators'

import { BaseService } from './base.service'
import { AuthService } from '../auth/auth.service'
import { LoggerService } from './logger.service'
import { Photo } from './photo.model'

@Injectable()
export class PhotosService extends BaseService {

  private BASE_URL = '/api/photos'
  private updates = new Subject<any>()
  private logger: any

  photos: Observable<Photo[]>

  constructor(
    private http: HttpClient,
    authService: AuthService,
    loggerService: LoggerService
  ) {
    super(authService)

    this.logger = loggerService.create('red', this.constructor.name)

    this.photos = this.updates.pipe(
      scan((photos: Photo[], operation: any) => operation(photos), {}),
      map(photosMap => Object.values(photosMap)),
      startWith([]),
      publishReplay(1),
      refCount()
    )

    this.photos.subscribe(val => this.logger.log('photos', val))
  }

  addPhotos(newPhotos: Photo[] | Photo) {
    this.updates.next((photosMap: {}) => {
      if (!Array.isArray(newPhotos)) { newPhotos = [newPhotos] }
      const newPhotosMap = {}
      newPhotos.forEach(photo => newPhotosMap[photo._id] = photo)
      return { ...photosMap, ...newPhotosMap }
    })
  }

  deletePhotoLocal(id: string) {
    this.updates.next((photosMap: {}) => {
      const newPhotosMap = { ...photosMap }
      delete newPhotosMap[id]
      return newPhotosMap
    })
  }

  getPhotos() {
    return this.http.get<Photo[]>(this.BASE_URL, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map(res => res.map(value => new Photo(value))),
        tap(photo => this.addPhotos(photo))
      )
  }

  createPhotoUrlForAlbum(albumId: string) {
    return `/api/albums/${albumId}/photos`
  }

  editPhoto(id: string, data: { name: string, description: string }) {
    return this.http.patch<Photo>(`${this.BASE_URL}/${id}`, data, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map(res => new Photo(res)),
        tap(photo => this.addPhotos(photo))
      )
  }

  removePhoto(id: string) {
    return this.http.delete<any>(`${this.BASE_URL}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        tap(() => this.deletePhotoLocal(id))
      )
  }
}
