import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthService } from '../service/basic-auth.service';
import { HardCodedAuthService } from '../service/hard-coded-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage  = 'Invalid Credentials';
  userName  = 'admin';
  password  = 'admin';
  invalidCred: boolean = false;

  constructor(private router : Router , private hardcodedAuthService : HardCodedAuthService , 
     private basicAuthService : BasicAuthService) { }

  ngOnInit(): void {
  }

  handleLogin() {

    if (this.hardcodedAuthService.authenticate(this.userName ,this.password)) {
      this.invalidCred = false;
      this.router.navigate(['welcome' , this.userName])
      console.log('valid cred')
    }
    else{
      this.invalidCred = true;
      console.log('invalid cred')
    }
  }

  // handleJWTAuthLogin() {
  //   this.basicAuthService.executeJWTAuthenticationService(this.userName, this.password)
  //       .subscribe(
  //         data => {
  //           console.log(data)
  //           this.router.navigate(['welcome', this.userName])
  //           this.invalidCred = false      
  //         },
  //         error => {
  //           console.log(error)
  //           this.invalidCred = true
  //         }
  //       )
  // }

  checkLogin() {
    (this.basicAuthService.authenticate(this.userName, this.password).subscribe(
      data => {
        console.log(data)
        this.router.navigate(['welcome', this.userName])
      },
      error => {
        console.log(error)
        this.invalidCred = true

      }
    )
    );

  }

}
