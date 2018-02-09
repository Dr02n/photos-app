import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { of } from 'rxjs/observable/of'
import { tap, map, exhaustMap, catchError } from 'rxjs/operators'
import * as decode from 'jwt-decode'

import { AuthService } from '../auth.service'
import { Login, LoginSuccess, LoginFailure, ActionTypes, Signup, } from './auth.actions'
import { User as UserInterface } from '../interfaces'

export const TOKEN = 'token'

export class User implements UserInterface {
  email: string

  constructor({ email }) {
    this.email = email
  }
}

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(ActionTypes.Login),
    exhaustMap((action: Login) =>
      this.authService.login(action.payload).pipe(
        map(({ token }) => new LoginSuccess({ token, user: new User(decode(token)) })),
        catchError(error => of(new LoginFailure('Invalid username or password')))
      )
    )
  )

  @Effect()
  signup$ = this.actions$.pipe(
    ofType(ActionTypes.Signup),
    exhaustMap((action: Signup) =>
      this.authService.signup(action.payload).pipe(
        map(({ token }) => new LoginSuccess({ token, user: new User(decode(token)) })),
        catchError(error => of(new LoginFailure(error.error.error)))
      )
    )
  )

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(ActionTypes.LoginSuccess),
    tap((action: LoginSuccess) => {
      localStorage.setItem(TOKEN, action.payload.token)
      this.router.navigate(['/'])
    })
  )

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(ActionTypes.Logout),
    tap(() => {
      localStorage.removeItem(TOKEN)
      this.router.navigate(['auth/login'])
    })
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }
}
