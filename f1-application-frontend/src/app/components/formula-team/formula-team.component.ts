import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faCalendarCheck, faCreditCard, faSignature, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { DateButton, DlDateTimePickerComponent } from 'angular-bootstrap-datetimepicker';
import * as moment from 'moment';
import { FormulaTeamData } from 'src/app/data/formula-team-data';
import { FormulateamService } from 'src/app/services/formulateam/formulateam.service';
import { DlDatePipe } from 'src/app/util/custom-date-pipe';
import { DlDateConverterPipe } from 'src/app/util/dl-date-pipe';

@Component({
  selector: 'app-formula-team',
  templateUrl: './formula-team.component.html',
  styleUrls: ['./formula-team.component.scss'],
  providers: [ DlDatePipe, DlDateConverterPipe ]
})
export class FormulaTeamComponent implements OnInit {
  team:FormGroup

  faSignature = faSignature;
  faCalendarCheck = faCalendarCheck;
  faTrophy = faTrophy;
  faCreditCard = faCreditCard;

  get name() { return this.team.get('name');}
  get foundationDate() { return this.team.get('foundationDate');}
  get numberOfConstructorWins() { return this.team.get('numberOfConstructorWins');}
  get isPaymentDue() { return this.team.get('isPaymentDue');}
  

  constructor(  @Inject(MAT_DIALOG_DATA) public data:any,
                public dialogRef: MatDialogRef<FormulaTeamComponent>,
                private teamService:FormulateamService,
                private dlPipe:DlDatePipe,
                private dlConverter:DlDateConverterPipe) 
             { 
    let _name = data?data.name:''
    let _foundationDate = data?dlConverter.transform(data.foundationDate):''
    let _numberOfConstructorWins = data?data.numberOfConstructorWins:''
    let _isPaymentDue = data?data.isPaymentDue:''

    this.team = new FormGroup({
      name: new FormControl(_name,[Validators.required,Validators.minLength(4)]),
      foundationDate: new FormControl(_foundationDate,[Validators.required]),
      numberOfConstructorWins: new FormControl(_numberOfConstructorWins,[Validators.required,Validators.min(0)]),
      isPaymentDue: new FormControl(_isPaymentDue,[]),
    },
    { 
      updateOn: 'submit'
    })
  }

  ngOnInit(): void {}

  onSubmit(){
    this.team.markAllAsTouched()
    if (this.team.valid) {
      console.log("Date: " + this.foundationDate?.value)
      if(!this.data){
        this.addNewTeam()
      }
      else{
        this.updateTeam()
      }
    } else {
      console.log("Invalid form!")
    }
  }

  addNewTeam(){
    let team:FormulaTeamData= {
      id: -1,
      name: this.name?.value,
      foundationDate: this.foundationDate?.value,
      numberOfConstructorWins: this.numberOfConstructorWins?.value,
      isPaymentDue:this.isPaymentDue?.value
    }

    this.teamService.addTeam(team).subscribe({
      next: (r) => { this.success("Succefully added team with name: " + this.name?.value, r)},
      error: (e) => { this.error(e);}
    })
  }

  updateTeam(){
    let team:FormulaTeamData= {
      id: this.data.id,
      name: this.name?.value,
      foundationDate: this.foundationDate?.value,
      numberOfConstructorWins: this.numberOfConstructorWins?.value,
      isPaymentDue:this.isPaymentDue?.value
    }

    this.teamService.updateTeam(this.data.id,team).subscribe({
      next: (r) => this.success("Succefully updated team with id: " + this.data.id, r),
      error: (e) => {this.error(e);}
    })
  }

  success(message:string,response?:any){
    // console.log("Error: " + JSON.stringify(response))
    this.teamService.snackbarMessage(message)
    this.dialogRef.close()
  }

  error(error:any){
    console.log("Error: " + JSON.stringify(error))
    if(error.error.snack)
      this.teamService.snackbarErrorMessage(error.error.snack)
  }

  datePickerFilter = (dateButton: DateButton, viewName: string) => {
    let minDate = moment("01/01/1900", "DD/MM/YYYY")
    return  dateButton.value >= minDate.valueOf() && dateButton.value <= moment.now().valueOf();
  }

}
