import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { catchError } from 'rxjs/operators/catchError'
import { BaseService } from './base.service'
import { AuthService } from '../auth/auth.service'
import { Album } from './album.model'

interface Data {
  name: string,
  description: string
}

@Injectable()
export class AlbumsService extends BaseService {
  constructor(private http: HttpClient, authService: AuthService) {
    super(authService.headers)
  }

  getUserAlbums(userId: number): Observable<Album[]> {
    return this.http.get<Album[]>(`/api/users/${userId}/albums`, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  createAlbum(data: Data): Observable<Album> {
    return this.http.post<Album>('/api/albums', data, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  getAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(`/api/albums/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  updateAlbum(id: string, data: Data): Observable<Album> {
    return this.http.patch<Album>(`/api/albums/${id}`, data, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  removeAlbum(id: string) {
    return this.http.delete<any>(`/api/albums/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError))
  }
}
