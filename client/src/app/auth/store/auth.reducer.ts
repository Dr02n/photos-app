import * as decode from 'jwt-decode'
import * as auth from './auth.actions'
import { User } from '../user.model'
import { TOKEN } from '../constatnts'

const token = localStorage.getItem(TOKEN)
const user = token ? new User(decode(token)) : null

export interface State {
  loggedIn: boolean
  user: User | null
}

export const initialState: State = {
  loggedIn: !!user,
  user,
}

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
      }
    }

    case auth.LOGOUT: {
      return initialState
    }

    default: {
      return state
    }
  }
}
