import { DatePipe,formatDate } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as _ from 'lodash';
import { Observable, Subject, Subscription } from 'rxjs';
import { BearerToken } from 'src/app/data/bearer-token';
import { UserData } from 'src/app/data/user-data';
import { environment } from 'src/environments/environment';

import { BaseService } from '../base-service';
import { options, optionsForTextResponse } from '../options';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService extends BaseService implements CanActivate {
  public userData:UserData;
  jwtHelper = new JwtHelperService();

  get token(): string | null{
    return localStorage.getItem('token');
  }


  constructor() { 
    super()
    localStorage.clear()
    this.userData = this.initUserData();
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.isAuthenticated()
  }

  checkAdminAuthority():boolean{
    if(this.userData.role == 'Admin'){
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    const token = this.token;
    if(token!=null){
      return !this.jwtHelper.isTokenExpired(token)
    }
    else {
      return false
    }
  }

  authenticate(username:string,password:string){
    let jwtRequest = {
      "username":username,
      "password":password
    }

    return this.http.post<any>(environment.userUrl+'/authenticate',jwtRequest,options)
  }

  logout(){
    return this.http.post<any>(environment.userUrl+'/logoutUser',null,optionsForTextResponse).subscribe(
      (response:any)=>{
        localStorage.clear()
        this.router.navigateByUrl("/login")
        this.snackBar.open("Successful logout!","Accept",{
          duration: 4000,
      })
      },
      err => {
        console.log("Error: "+JSON.stringify(err))
      })
  }

  register(username:string,password:string,passwordAgain:string,email:string){
    let registrationRequest = {
      "username":username,
      "password":password,
      "passwordAgain":passwordAgain,
      "email":email
    }
    return this.http.post<any>(environment.userUrl+'/register',registrationRequest,options)
  }


  loadUserData(){
    let decodedToken = this.jwtHelper.decodeToken(this.token!)
    this.userData.id = decodedToken.id
    this.userData.username = decodedToken.username
    this.userData.email = decodedToken.email
    this.userData.role = decodedToken.role

  }


  updateUserData(_username:string,_displayname:string,_email:string, _local:string){
    let updateRequest = {
      username:_username,
      displayname:_displayname,
      email:_email,
      local: _local
    }
    return this.http.put<any>(environment.userUrl+'/updateUserdata',updateRequest,options)
  }

  
  updatePassword(oldPassword:string,newPassword:string,newPasswordAgain:string,){
    let updateRequest = {
      "oldPassword":oldPassword,
      "newPassword":newPassword,
      "newPasswordAgain":newPasswordAgain,
    }
    return this.http.put<any>(environment.userUrl+'/updatePassword',updateRequest,options)
  }


  initUserData():UserData{
    let newUserData:UserData = {
      id: -1,
      username:"None",
      role:"None",
      email:"None",
    }
    return newUserData;
  }
}

