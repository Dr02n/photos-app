import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { of } from 'rxjs/observable/of'
import { tap, map, exhaustMap, catchError } from 'rxjs/operators'
import * as decode from 'jwt-decode'
import { AuthService } from '../auth.service'
import * as Auth from './auth.actions'
import { User } from '../user.model'
import { TOKEN } from '../constatnts'

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(Auth.LOGIN),
    exhaustMap((action: Auth.Login) =>
      this.authService
        .login(action.payload)
        .pipe(
          map(({ token }) => new Auth.LoginSuccess({ token, user: new User(decode(token)) })),
          catchError(error => of(new Auth.LoginFailure('Invalid username or password')))
        ))
  )

  @Effect()
  signup$ = this.actions$.pipe(
    ofType(Auth.SIGNUP),
    exhaustMap((action: Auth.Signup) =>
      this.authService
        .signup(action.payload)
        .pipe(
          map(({ token }) => new Auth.LoginSuccess({ token, user: new User(decode(token)) })),
          catchError(error => of(new Auth.LoginFailure(error.error.message)))
        ))
  )

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(Auth.LOGIN_SUCCESS),
    tap((action: Auth.LoginSuccess) => {
      localStorage.setItem(TOKEN, action.payload.token)
      this.router.navigate(['/'])
    })
  )

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(Auth.LOGOUT, Auth.LOGIN_REDIRECT),
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
