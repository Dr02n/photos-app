import { Action } from '@ngrx/store'
import { User } from '../user.model'
import { Credentials } from '../credentials.model'

export const LOGIN = '[Auth] Login'
export const SIGNUP = '[Auth] Signup'
export const LOGOUT = '[Auth] Logout'
export const LOGIN_SUCCESS = '[Auth] Login Success'
export const LOGIN_FAILURE = '[Auth] Login Failure'
export const LOGIN_REDIRECT = '[Auth] Login Redirect'
export const RESET_VIEW_STATE = '[Auth] Reset View State'

export class Login implements Action {
  readonly type = LOGIN

  constructor(public payload: Credentials) { }
}

export class Signup implements Action {
  readonly type = SIGNUP

  constructor(public payload: Credentials) { }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS

  constructor(public payload: { user: User, token: string }) { }
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE

  constructor(public payload: string) { }
}

export class LoginRedirect implements Action {
  readonly type = LOGIN_REDIRECT
}

export class Logout implements Action {
  readonly type = LOGOUT
}

export class ResetViewState implements Action {
  readonly type = RESET_VIEW_STATE
}

export type Actions = Login | Signup | LoginSuccess | LoginFailure | LoginRedirect | Logout | ResetViewState
