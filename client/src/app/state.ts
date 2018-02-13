import * as fromAuth from './auth/store/auth.reducer'
import * as fromAuthView from './auth/store/auth-view.reducer'

export interface AppState {
  auth: {
    state: fromAuth.State,
    view: fromAuthView.State
  }
}
