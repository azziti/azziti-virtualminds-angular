import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})

// check if user is authenticated or redirect to login page
export class DashboardGuard implements CanActivate, CanLoad {
  constructor(public storageService: StorageService, public router: Router , public authService : AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;

    return new Promise(resolve => {
      // const credentials = this.storageService.loadCredentials();
      if( this.authService.isAuthenticated() ){
        resolve(true);
      } else {
        this.router.navigate(['authentication']);
        resolve(false);
      }
    });
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    return new Promise(resolve => {
      // const credentials = this.storageService.loadCredentials();
      if(this.authService.isAuthenticated()){
        resolve(true);
      } else {
        this.router.navigate(['authentication']);
        resolve(false);
      }
    });
  }
}
