import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticaterUser'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService {

  constructor(private http: HttpClient) { }

  executeJWTAuthenticationService1(userName: string,password: string) {
    
    return this.http.post<any>(
      'http://localhost:4040/authenticate1',{
        userName,
        password
      }).pipe(
        map(
          data => {
            console.log(data)
            sessionStorage.setItem(AUTHENTICATED_USER, userName);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            return data;
          }
        )
      );
    
  }

  authenticate(username: string,password: string) {
    return this.http.post<any>('http://localhost:4040/authenticate',{username,password}).pipe(
     map(
       userData => {
       // sessionStorage.setItem(AUTHENTICATED_USER,username);
       sessionStorage.setItem('username',username);
        let tokenStr= 'Bearer '+userData.token;
       // sessionStorage.setItem(TOKEN, tokenStr);
       sessionStorage.setItem('token', tokenStr);
        return userData;
       }
     )

    );
  }

  // getAuthenticatedUser() {
  //   return sessionStorage.getItem(AUTHENTICATED_USER)
  // }

  // getAuthenticatedToken() {
  //   if(this.getAuthenticatedUser())
  //     return sessionStorage.getItem(TOKEN)
  // }


  IsUserLoggedIn(){
   let user =  sessionStorage.getItem('username')
   console.log("BasicAuthService - IsUserLoggedIn - user Is looged In")
   return (!(user === null));

  }

  logoutUser(){
    console.log("BasicAuthService - IsUserLoggedIn - user Is looged Out")
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
  }
}
