import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import * as Auth from './store/auth.actions'
import { map, take } from 'rxjs/operators'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<any>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select('auth'),
      select('status'),
      select('loggedIn'),
      map(authed => {
        if (!authed) { this.store.dispatch(new Auth.LoginRedirect())
          return false
        }

        return true
      }),
      take(1)
    )
  }
}
