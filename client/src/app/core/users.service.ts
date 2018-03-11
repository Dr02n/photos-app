import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { combineLatest, catchError, tap, map } from 'rxjs/operators'

import { BaseService } from './base.service'
import { AuthService } from '../auth/auth.service'
import { AlbumsService } from './albums.service'
import { LoggerService } from './logger.service'
import { User } from './user.model'
import { Album } from './album.model'

@Injectable()
export class UsersService extends BaseService {

  private BASE_URL = '/api/users'
  private logger: any

  currentUser = new BehaviorSubject<User>(null)
  currentUserAlbums: Observable<Album[]>

  constructor(
    private http: HttpClient,
    private albumsService: AlbumsService,
    authService: AuthService,
    loggerService: LoggerService
  ) {
    super(authService)

    this.logger = loggerService.getLogger('green', this.constructor.name)

    this.currentUserAlbums = this.currentUser.pipe(
      combineLatest(
        albumsService.albums,
        (currentUser: User, albums: Album[]) => currentUser
          ? albums.filter(album => album.author._id || album.author === currentUser._id)
          : []
      )
    )

    this.currentUser.subscribe(val => this.logger.log('currentUser', val))
    this.currentUserAlbums.subscribe(val => this.logger.log('currentUserAlbums', val))
  }

  setCurrentUser(user: User) {
    this.currentUser.next(user)
  }

  getUser(id: string) {
    return this.http.get<any>(`${this.BASE_URL}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map(res => new User(res)),
        tap(user => this.setCurrentUser(user))
      )
  }

  getUserAlbums(userId: string) {
    return this.http.get<any[]>(`${this.BASE_URL}/${userId}/albums`, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map(res => res.map(value => new Album(value))),
        tap(albums => this.albumsService.addAlbums(albums))
      )
  }
}
