import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators/tap'
import { pipe } from 'rxjs/util/pipe'
import * as decode from 'jwt-decode'
import { catchError } from 'rxjs/operators/catchError'
import { of } from 'rxjs/observable/of'
import { map } from 'rxjs/operators/map'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'

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

  private signupUrl = '/api/auth/signup'
  private loginUrl = '/api/auth/login'
  private tokenKey = 'token'

  private authFlow = pipe(
    tap(({ token }) => this.token = token),
    map(({ token }) => ({ user: new User(decode(token)) })),
    tap(({ user }) => this.user = user),
    tap(() => this.router.navigate(['/']))
  )

  constructor(private http: HttpClient, private router: Router) {
    if (this.token) {
      this.user = new User(decode(this.token))
    }
  }

  get token() {
    return localStorage.getItem(this.tokenKey)
  }

  set token(data) {
    localStorage.setItem(this.tokenKey, data)
  }

  signup(credentials: {email, password}): Observable<{ user?, error? }> {
    this.pending = true
    return this.http.post<{ token }>(this.signupUrl, credentials).pipe(
      this.authFlow,
      catchError(this.handleError),
      tap(() => this.pending = false)
    )
  }

  login(credentials: {email, password}): Observable<{ user?, error? }> {
    this.pending = true
    return this.http.post<{ token }>(this.loginUrl, credentials).pipe(
      this.authFlow,
      catchError(this.handleError),
      tap(() => this.pending = false)
    )
  }

  logout() {
    this.user = null
    localStorage.removeItem(this.tokenKey)
    this.router.navigate(['auth/login'])
  }

  private handleError(err) {
    const error = err.error.message || (err.status === 401 ? 'Invalid username or password' : null)
    if (err.status !== 422 && err.status !== 401) { console.error(err) }
    return of({ error })
  }
}
