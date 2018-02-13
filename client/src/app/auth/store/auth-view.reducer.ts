import * as auth from './auth.actions'

export interface State {
  error: string | null
  pending: boolean
}

export const initialState: State = {
  error: null,
  pending: false,
}

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN:
    case auth.SIGNUP: {
      return {
        ...state,
        error: null,
        pending: true,
      }
    }

    case auth.LOGIN_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      }
    }

    case auth.LOGIN_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      }
    }

    case auth.RESET_VIEW_STATE: {
      return initialState
    }

    default: {
      return state
    }
  }
}
