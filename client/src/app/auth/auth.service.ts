import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { tap } from 'rxjs/operators/tap'
import * as decode from 'jwt-decode'
import { catchError } from 'rxjs/operators/catchError'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { ErrorObservable } from 'rxjs/observable/ErrorObservable'
import { LocalStorageItem } from './local-storage-item'

export class User {
  email: string

  constructor({ email }) {
    this.email = email
  }
}

@Injectable()
export class AuthService {

  user: User | null = null
  pending = false
  redirectUrl: string

  private token = new LocalStorageItem('token')
  private signupUrl = '/api/auth/signup'
  private loginUrl = '/api/auth/login'

  constructor(private http: HttpClient, private router: Router) {
    if (this.token.value) { this.user = this.getUserFromToken(this.token.value) }
  }

  get isLoggedIn() {
    return !!this.user
  }

  get headers() {
    return {
      'Authorization': this.token.value
    }
  }

  signup(credentials) {
    return this.request(this.signupUrl, credentials)
  }

  login(credentials) {
    return this.request(this.loginUrl, credentials)
  }

  logout() {
    this.user = null
    this.token.value = null
    this.router.navigate(['auth/login'])
  }

  private request(url: string, credentials: { email, password }): Observable<{ user }> {
    this.pending = true
    return this.http.post<{ token }>(url, credentials).pipe(
      catchError(this.handleError),
      tap(
        ({ token }) => {
          this.pending = false
          this.user = this.getUserFromToken(token)
          this.token.value = token
          this.router.navigate([this.redirectUrl || '/'])
          if (this.redirectUrl) { this.redirectUrl = null }
        },
        () => this.pending = false
      )
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status >= 500) { console.error('Error:', error) }

    const message = error.error.message || (error.status === 401
      ? 'Invalid username or password'
      : 'Something bad happened; please try again later.'
    )
    return new ErrorObservable(message)
  }

  private getUserFromToken(token) {
    return new User(decode(token))
  }
}
