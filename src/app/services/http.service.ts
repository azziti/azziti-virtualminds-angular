import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }


  post(serviceName: string, data: any) {

    console.log("Sending post request ...")

    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    const options = {
      headers,
      withCredintials: false,
      observe: "response" as 'body'
    };
    const url = environment.apiUrl + serviceName;

    return this.http.post(url, data, options);
  }

  authPost(serviceName: string, data : any) {

    console.log("Sending auth post request ...");

    const token: string = this.storageService.loadToken();
    const url = environment.apiUrl + serviceName;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    const options = {
      headers,
      withCredintials: false,
      observe: "response" as 'body'
    };

    return this.http.post(url, data, options);
  }

  authGet(serviceName: string, queryParams: HttpParams =  new HttpParams()) {

    console.log("Sending auth get request ...");

    const token: string = this.storageService.loadToken();
    const url = environment.apiUrl + serviceName;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    const options = {
      headers,
      withCredintials: false,
      observe: "response" as 'body',
      params: queryParams
    };

    return this.http.get(url, options);
  }

  authPut(serviceName: string, data = null) {

    console.log("Sending auth put request ..")

    const token: string = this.storageService.loadToken();
    const url = environment.apiUrl + serviceName;
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Cross-Origin': 'true',
      "Access-Control-Allow-Headers": "*",
      'Access-Control-Request-Methods': '*',

    })


    const options = {
      headers,
      withCredintials: false,
      observe: "response" as 'body',
    };

    return this.http.put(url, data, options);
  }

  authDelete(serviceName: string, queryParams: HttpParams = new HttpParams()) {

    console.log("Sending auth delete request ..")


    const token: string = this.storageService.loadToken();
    const url = environment.apiUrl + serviceName;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    const options = {
      headers,
      withCredintials: false,
      observe: "response" as 'body',
      params: queryParams
    };

    return this.http.delete(url, options);
  }
}
