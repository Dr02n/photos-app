import { Action } from '@ngrx/store'

export enum ActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Signup = '[Auth] Signup'
}

export class Login implements Action {
  readonly type = ActionTypes.Login
  constructor(public payload: any) {}
}

export class Signup implements Action {
  readonly type = ActionTypes.Signup
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type = ActionTypes.LoginSuccess
  constructor(public payload: any) {}
}

export class LoginFailure implements Action {
  readonly type = ActionTypes.LoginFailure
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = ActionTypes.Logout
}

export type Actions = Login | LoginSuccess | LoginFailure | Logout | Signup
