import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Store } from '@ngrx/store'
import * as decode from 'jwt-decode'
import 'rxjs/add/operator/do'
import { AppState } from '../state'
import { ActionTypes } from './auth.reducer'

export const TOKEN = 'token'

export interface Credentials {
  email: string
  password: string
}

export interface Response {
  token: string
}

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
    const token = localStorage.getItem(TOKEN)

    if (token) {
      this.store.dispatch({ type: ActionTypes.LOGIN, payload: decode(token) })
    }
  }

  signup(credentials: Credentials) {
    return this.http.post<Response>('/api/auth/signup', credentials)
      .do(data => {
        localStorage.setItem(TOKEN, data.token)
        this.store.dispatch({ type: ActionTypes.LOGIN, payload: decode(data.token) })
      })
  }

  login(credentials: Credentials) {
    return this.http.post<Response>('/api/auth/login', credentials)
      .do(data => {
        localStorage.setItem(TOKEN, data.token)
        this.store.dispatch({ type: ActionTypes.LOGIN, payload: decode(data.token) })
      })
  }

  logout() {
    localStorage.removeItem(TOKEN)
    this.store.dispatch({ type: ActionTypes.LOGOUT })
  }
}
