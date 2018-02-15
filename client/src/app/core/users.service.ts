import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { catchError } from 'rxjs/operators/catchError'
import { BaseService } from './base.service'
import { AuthService } from '../auth/auth.service'
import { User } from './user.model'

@Injectable()
export class UsersService extends BaseService {

  private usersUrl = '/api/users'

  constructor(private http: HttpClient, authService: AuthService) {
    super(authService.headers)
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError))
  }
}
