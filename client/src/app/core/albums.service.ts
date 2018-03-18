import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { catchError, scan, publishReplay, refCount, tap, map, switchMap, startWith, combineLatest } from 'rxjs/operators'

import { BaseService } from './base.service'
import { AuthService } from '../auth/auth.service'
import { LoggerService } from './logger.service'
import { PhotosService } from './photos.service'
import { Album } from './album.model'
import { Photo } from './photo.model'

interface Data {
  name: string,
  description: string
}

@Injectable()
export class AlbumsService extends BaseService {

  private BASE_URL = '/api/albums'
  private updates = new Subject<any>()
  private currentAlbumId = new BehaviorSubject<string>(null)
  private logger: any

  albums: Observable<Album[]>
  currentAlbum: Observable<Album>
  currentAlbumPhotos: Observable<Photo[]>

  constructor(
    private http: HttpClient,
    private photosService: PhotosService,
    authService: AuthService,
    loggerService: LoggerService
  ) {
    super(authService)

    this.logger = loggerService.getLogger('blue', this.constructor.name)

    this.albums = this.updates.pipe(
      scan((albums: Album[], operation: any) => operation(albums), {}),
      map(albumsMap => Object.values(albumsMap)),
      startWith([]),
      publishReplay(1),
      refCount()
    )

    this.currentAlbum = this.currentAlbumId.pipe(
      combineLatest(this.albums),
      switchMap(([id, albums]) => {
        if (!id) { return [null] }
        const album = albums.find(i => i._id === id)
        return album ? [album] : this.getAlbum(id)
      }),
      publishReplay(1),
      refCount()
    )

    this.currentAlbumPhotos = this.currentAlbumId.pipe(
      combineLatest(photosService.photos),
      map(([id, photos]) => {
        return id ? photos.filter(photo => photo.album._id === id) : []
      }),
      publishReplay(1),
      refCount()
    )

    this.albums.subscribe(val => this.logger.log('albums', val))
    this.currentAlbum.subscribe(val => this.logger.log('currentAlbum', val))
  }

  /**
   * Local operations
   */

  setCurrentAlbumId(id: string) {
    this.currentAlbumId.next(id)
  }

  addAlbums(newAlbums: Album[] | Album) {
    this.updates.next((albumsMap: {}) => {
      if (!Array.isArray(newAlbums)) { newAlbums = [newAlbums] }
      const newAlbumsMap = {}
      newAlbums.forEach(album => newAlbumsMap[album._id] = album)
      return { ...albumsMap, ...newAlbumsMap }
    })
  }

  deleteAlbumLocal(id: string) {
    this.updates.next((albumsMap: {}) => {
      const newAlbumsMap = { ...albumsMap }
      delete newAlbumsMap[id]
      return newAlbumsMap
    })
  }

  /**
   * Server interactions
   */

  createAlbum(data: Data) {
    return this.http.post<Album>(this.BASE_URL, data, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map(res => new Album(res)),
        tap(album => this.addAlbums(album))
      )
  }

  getAlbum(id: string) {
    return this.http.get<Album>(`${this.BASE_URL}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map(res => new Album(res)),
        tap(album => this.addAlbums(album))
      )
  }

  updateAlbum(id: string, data: Data): Observable<Album> {
    return this.http.patch<Album>(`${this.BASE_URL}/${id}`, data, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map(res => new Album(res)),
        tap(album => this.addAlbums(album))
      )
  }

  deleteAlbum(id: string) {
    return this.http.delete<any>(`${this.BASE_URL}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        tap(() => this.deleteAlbumLocal(id))
      )
  }

  getAlbumPhotos(albumId: string) {
    return this.http.get<Photo[]>(`${this.BASE_URL}/${albumId}/photos`, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map(res => res.map(value => new Photo(value))),
        tap(photos => this.photosService.addPhotos(photos))
      )
  }
}
