import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Credentials } from './interfaces'

interface Response {
  token: string
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  signup(credentials: Credentials) {
    return this.http.post<Response>('/api/auth/signup', credentials)
  }

  login(credentials: Credentials) {
    return this.http.post<Response>('/api/auth/login', credentials)
  }
}
