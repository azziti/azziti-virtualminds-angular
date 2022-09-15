import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../config/app-constants';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
    private storageService: StorageService
  ) { }

  login(data: any): Observable<any> {
    return this.httpService.post(AppConstants.login, data);
  }

  // create a new account
  register(data: any): Observable<any> {
    return this.httpService.post(AppConstants.register, data);
  }

  // clear the token
  logout() {

    this.storageService.removeData(AppConstants.principal);
    this.storageService.removeData(AppConstants.token);
    this.storageService.removeData(AppConstants.roles);
  }


// check if user is authenticated
//verify if token exists in storage
  isAuthenticated() {

    if (this.storageService.loadToken() != null) return true;
    return false;
  }
}
