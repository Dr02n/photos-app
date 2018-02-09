import * as decode from 'jwt-decode'

import { ActionTypes, Actions } from './auth.actions'
import { TOKEN, User } from './auth.effects'

const token = localStorage.getItem(TOKEN)

export interface State {
  user: User | null,
  error: string | null,
  pending: boolean
}

const initialState: State = {
  user: token ? new User(decode(token)) : null,
  error: null,
  pending: false
}

export function AuthReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.Login:
    case ActionTypes.Signup:
      return {
        ...state,
        error: null,
        pending: true,
      }
    case ActionTypes.LoginSuccess:
      return {
        ...state,
        user: action.payload.user,
        error: null,
        pending: false
      }
    case ActionTypes.LoginFailure: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      }
    }
    case ActionTypes.Logout:
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}
