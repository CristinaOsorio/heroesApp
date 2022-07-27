import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../service/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authService.verifiedAuthentication()
      .pipe(
        tap(auth => {
          if(!auth) this.redirectTo();
        })
      );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | boolean {
    return this.authService.verifiedAuthentication()
      .pipe(
        tap(auth => {
          if(!auth) this.redirectTo();
        })
      );
  }

  private redirectTo() {
    this.router.navigate(['/auth'])
  }
}
