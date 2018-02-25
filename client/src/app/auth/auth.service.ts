import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { ErrorObservable } from 'rxjs/observable/ErrorObservable'
import { catchError } from 'rxjs/operators/catchError'
import { Observable } from 'rxjs/Observable'
import { tap } from 'rxjs/operators/tap'
import * as decode from 'jwt-decode'

export class User {
  email: string

  constructor({ email }) {
    this.email = email
  }
}

@Injectable()
export class AuthService {

  user: User
  pending = false
  redirectUrl: string

  private signupUrl = '/api/auth/signup'
  private loginUrl = '/api/auth/login'
  private tokenKey = 'token'

  constructor(private http: HttpClient, private router: Router) {
    if (this.token) { this.user = this.getUserFromToken(this.token) }
  }

  get isLoggedIn() {
    return !!this.user
  }

  get headers() {
    return {
      'Authorization': this.token
    }
  }

  get token() {
    return localStorage.getItem(this.tokenKey)
  }

  set token(value) {
    if (value) {
      localStorage.setItem(this.tokenKey, value)
    } else {
      localStorage.removeItem(this.tokenKey)
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
    this.token = null
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
          this.token = token
          this.router.navigate([this.redirectUrl || '/'])
          if (this.redirectUrl) { this.redirectUrl = null }
        },
        (err) => this.pending = false
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
