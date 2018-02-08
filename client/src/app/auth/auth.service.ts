import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do';

const TOKEN = 'token'

export interface Credentials {
  email: string;
  password: string;
}

export interface Response {
  token: string
}

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(credentials: Credentials) {
    return this.http.post<Response>('/api/auth/signup', credentials)
      .do(data => {
        localStorage.setItem(TOKEN, data.token)
        // TODO: add to store
      })
  }

  login(credentials: Credentials) {
    return this.http.post<Response>('/api/auth/login', credentials)
      .do(data => {
        localStorage.setItem(TOKEN, data.token)
        // TODO: add to store
      })
  }

  logout() {
    localStorage.removeItem(TOKEN)
    // TODO: remove from store
  }
}