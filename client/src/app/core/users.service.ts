import { Injectable } from '@angular/core'
import { BaseService } from './base.service'
import { HttpClient } from '@angular/common/http'
import { AuthService } from '../auth/auth.service'
import { catchError } from 'rxjs/operators/catchError'
import { User } from './user.model'

@Injectable()
export class UsersService extends BaseService {
  constructor(private http: HttpClient, authService: AuthService) {
    super(authService.headers)
  }

  getMe() {
    return this.http.get<User>('/api/users/me', this.httpOptions)
      .pipe(catchError(this.handleError))
  }
}
