import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AppConstants } from '../config/app-constants';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveData(key: string, value: any) {
    localStorage.setItem(key, this.encrypt(JSON.stringify(value)));
  }


  getData(key: string) {
    let data = localStorage.getItem(key);
    if(data != null) {
      return JSON.parse(this.decrypt(data));
    }
    return null
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }

  clearData() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, AppConstants.encryptionKey).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, AppConstants.encryptionKey).toString(CryptoJS.enc.Utf8);
  }

  saveToken( jwt : string) {

    this.saveData(AppConstants.token, jwt);
    let jwtHelper = new JwtHelperService();
    const roles : Array<any> = jwtHelper.decodeToken(jwt).roles;
    this.saveData(AppConstants.roles , roles);
    const principal : any = jwtHelper.decodeToken(jwt).sub;
    this.saveData(AppConstants.principal, principal);

  }

  loadCredentials() {

    return {
      token : this.getData(AppConstants.token),
      roles : this.getData(AppConstants.roles),
      principal : this.getData(AppConstants.principal)
    }
  }

  loadToken(){
    return this.loadCredentials().token;
  }

  loadRoles(){
    return this.loadCredentials().roles;
  }

  loadPrincipal(){
    return this.loadCredentials().principal;
  }
}
