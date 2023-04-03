import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {

  public userToken:string | null;
  constructor(
    private _route: Router
  ) {
    this.userToken = localStorage.getItem('token')
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userToken) {
      return true
    } else {
      this._route.navigateByUrl('/login')
      return false
    }
  }

}
