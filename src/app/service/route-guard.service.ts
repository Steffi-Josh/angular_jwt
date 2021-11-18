import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BasicAuthService } from './basic-auth.service';
import { HardCodedAuthService } from './hard-coded-auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private hardCodedAuthService: HardCodedAuthService , private route : Router ,
     private basicAuthService : BasicAuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.basicAuthService.IsUserLoggedIn()) {
      console.log("User is logged In")
      return true;
    }
    else {
      console.log("User is not logged In")
      this.route.navigate(['login']);
      return false;
    }

  }
}
