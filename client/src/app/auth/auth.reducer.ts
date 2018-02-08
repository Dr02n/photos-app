import { Action } from '../action';

export enum ActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export interface User {
  sub: string,
  iat: string,
  email: string
}

export interface AuthState {
  user: User
}

const initialState = {
  user: null,
}

export function reducer(state: AuthState = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {...state, user: action.payload};
    case ActionTypes.LOGOUT:
      return {...state, user: null};
    default:
      return state;
  }
}