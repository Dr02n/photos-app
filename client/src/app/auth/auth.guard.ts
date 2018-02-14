import { Injectable } from '@angular/core'
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn) { return true }

    this.authService.redirectUrl = state.url

    this.router.navigate(['auth/login'])
    return false
  }
}
