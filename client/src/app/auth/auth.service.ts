import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators/tap'
import * as decode from 'jwt-decode'
import { catchError } from 'rxjs/operators/catchError'
import { of } from 'rxjs/observable/of'
import { map } from 'rxjs/operators/map'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
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
    if (this.token.value) { this.user = new User(decode(this.token.value)) }
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

  private request(url: string, credentials: { email, password }): Observable<{ user?, error?}> {
    this.pending = true
    return this.http.post<{ token }>(url, credentials).pipe(
      tap(({ token }) => this.token.value = token),
      map(({ token }) => ({ user: new User(decode(token)) })),
      tap(({ user }) => this.user = user),
      tap(() => this.router.navigate([this.redirectUrl || '/'])),
      tap(() => this.redirectUrl = null),
      catchError(this.handleError),
      tap(() => this.pending = false)
    )
  }

  private handleError(err) {
    const error = err.error.message || (err.status === 401 ? 'Invalid username or password' : null)
    if (err.status !== 422 && err.status !== 401) { console.error(err) }
    return of({ error })
  }
}
