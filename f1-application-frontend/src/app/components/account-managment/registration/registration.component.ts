import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
;
import { UserDetailService } from 'src/app/services/user/user-detail.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserData } from 'src/app/data/user-data';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { MatchingValidator } from 'src/app/util/matching-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, AfterViewInit {

  faUserTie = faUserTie;

  registration:FormGroup;
  get username() { return this.registration.get('username');}
  get password() { return this.registration.get('password');}
  get passwordAgain() { return this.registration.get('passwordAgain');}
  get email() { return this.registration.get('email');}



  constructor(private userService:UserDetailService,public snackBar: MatSnackBar, private router: Router) {
    this.registration = new FormGroup({
      username: new FormControl('', [Validators.required,Validators.minLength(4)]),
      password: new FormControl('', [Validators.required,Validators.minLength(4)]),
      passwordAgain: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email])
    },
    { 
      validators: MatchingValidator('password', 'passwordAgain'),
      updateOn: 'submit'
    })
  }


  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    
  }

  onSubmit():void{
    this.registration.markAllAsTouched()
    if (this.registration.valid) {
        this.registrate()
    } else {
      console.log("Invalid form!")
    }
  }

  registrate(){
    this.userService.register(
      this.username!.value,
      this.password!.value,
      this.passwordAgain!.value,
      this.email!.value)
    .subscribe(
      (response:UserData)=>{
        this.router.navigate(['/login']);
        this.snackbarMessage("Registration successful!")
      },
      (err: any) => {this.snackbarErrorMessage("Registration failed!",err)})
  }


  snackbarMessage(message:string){
    this.snackBar.open(message,"Accept",{
      duration: 4000,
    });
  }

  snackbarErrorMessage(message:string,err:any){
    this.snackBar.open(message,"Accept",{
      duration: 4000,
    });
    console.log(err);
  }
}
