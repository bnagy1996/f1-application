import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Type } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppModule } from '../app.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';


@Injectable({
  providedIn: 'root',
})
export class BaseService {
    router: Router
    http: HttpClient
    snackBar: MatSnackBar
    dialog: MatDialog

  constructor() {
        this.router = AppModule.injector.get(Router);
        this.http = AppModule.injector.get(HttpClient);
        this.snackBar = AppModule.injector.get(MatSnackBar);
        this.dialog = AppModule.injector.get(MatDialog);
  }

  snackbarMessage(message:string){
      this.snackBar.open(message,"Accept",{
          //horizontalPosition: 'end',
          //verticalPosition: 'top',
          duration: 4000,
      });
  }

  snackbarErrorMessage(message:string){
      this.snackBar.open(message,"Accept",{
          duration: 4000,
      });
  }

  error(){
    this.snackBar.open("Error","Accept",{
        duration: 4000,
    });
}


  convertMap(_entries:any):Map<string,number>{
      return new Map(Object.entries(_entries));
  }
}
