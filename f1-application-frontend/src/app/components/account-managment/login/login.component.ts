import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BearerToken } from 'src/app/data/bearer-token';
import { UserDetailService } from 'src/app/services/user/user-detail.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login:FormGroup

  get username() { return this.login.get('username');}
  get password() { return this.login.get('password');}

  constructor(private router: Router,private userService:UserDetailService) { 
    this.login = new FormGroup({
      username: new FormControl('',[Validators.required,Validators.minLength(4)]),
      password: new FormControl('',[Validators.required,Validators.minLength(4)])
    },
    { 
      updateOn: 'submit'
    })
  }

  ngOnInit(): void {}

  onSubmit():void{
    this.login.markAllAsTouched()
    if (this.login.valid) {
      this.authenticate()
    } else {
      console.log("Invalid form!")
    }
  }

  authenticate(){
    this.userService.authenticate(this.login.get('username')!.value,this.login.get('password')!.value).subscribe({
      next: (r) => this.success(r),
      error: (e) => this.error(e)
    })
     
  }

  success(response: BearerToken){
    this.username?.setValue('')
    this.password?.setValue('')
    localStorage.setItem('token',response.token!);
    this.userService.loadUserData();
    this.router.navigate(['/formulateams'], {queryParams: {page: 0, size: 9, asc: "asc", sort: 'name'}});
  }

  error(error:any){
    console.log("Error while trying to login: " + JSON.stringify(error))
  }
}
