import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AppConstants } from '../config/app-constants';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // crypt and save an item to local storage
  saveData(key: string, value: any) {
    localStorage.setItem(key, this.encrypt(JSON.stringify(value)));
  }

  // get and decrypt an item from local storage
  getData(key: string) {
    let data = localStorage.getItem(key);
    if(data != null) {
      return JSON.parse(this.decrypt(data));
    }
    return null
  }

  //delete item from local storage
  removeData(key: string) {
    localStorage.removeItem(key);
  }


  // clear local storage
  clearData() {
    localStorage.clear();
  }

  // encode data
  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, AppConstants.encryptionKey).toString();
  }

  //decode data
  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, AppConstants.encryptionKey).toString(CryptoJS.enc.Utf8);
  }


  //decode jwt token and save its elements
  saveToken( jwt : string) {

    this.saveData(AppConstants.token, jwt);
    let jwtHelper = new JwtHelperService();
    const roles : Array<any> = jwtHelper.decodeToken(jwt).roles;
    this.saveData(AppConstants.roles , roles);
    const principal : any = jwtHelper.decodeToken(jwt).sub;
    this.saveData(AppConstants.principal, principal);

  }

  //get user credentials from local storage
  loadCredentials() {

    return {
      token : this.getData(AppConstants.token),
      roles : this.getData(AppConstants.roles),
      principal : this.getData(AppConstants.principal)
    }
  }

  // load user token
  loadToken(){
    return this.loadCredentials().token;
  }

  // load user roles
  loadRoles(){
    return this.loadCredentials().roles;
  }

  //load user infos
  loadPrincipal(){
    return this.loadCredentials().principal;
  }
}
