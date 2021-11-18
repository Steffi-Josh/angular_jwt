import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AUTHENTICATED_USER, BasicAuthService, TOKEN } from '../basic-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor{

  constructor(private basicAuthService : BasicAuthService) { }

  // intercept(request: HttpRequest<any>, next: HttpHandler){
  //   // let username = 'in28minutes'
  //   // let password = 'dummy'
  //   //let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
  //   let basicAuthHeaderString = this.basicAuthService.getAuthenticatedToken();
  //   let username = this.basicAuthService.getAuthenticatedUser()

  //   if(basicAuthHeaderString && username) { 
  //     request = request.clone({
  //       setHeaders : {
  //           Authorization : basicAuthHeaderString
  //         }
  //       }) 
  //   }
  //   return next.handle(request);
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("token1" +  sessionStorage.getItem('token'))
    console.log("username" + sessionStorage.getItem('username'))
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      console.log("token2" +  sessionStorage.getItem('token'))
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token') as string
        }
      })
    }

    return next.handle(req);

  }
}
