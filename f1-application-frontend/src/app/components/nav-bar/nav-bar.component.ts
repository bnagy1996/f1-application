import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { UserDetailService } from 'src/app/services/user/user-detail.service';
import { environment } from 'src/environments/environment';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { AutoDestroy } from 'src/app/util/auto-destroy';
import { MatDialog } from '@angular/material/dialog';
import { FormulateamService } from 'src/app/services/formulateam/formulateam.service';
import { FormulaTeamComponent } from '../formula-team/formula-team.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  viewProviders: [AutoDestroy]
})
export class NavBarComponent implements OnInit {

  title = environment.title;


  required:string = ""



  constructor(
        private router: Router,
        private userService:UserDetailService,
        private teamService:FormulateamService,
        private readonly destroy:AutoDestroy,
        private readonly dialog: MatDialog) { 

      
    
    this.dialog.afterAllClosed.pipe(takeUntil(destroy)).subscribe(() => {
      this.teamService.nextTeam();
    })
    
  }
  
  ngOnInit(): void {}

  logout(){
    this.userService.logout()
  }

  addTeam(){
    this.dialog.open(FormulaTeamComponent, {
      width: '50rem',
      height: '40rem',
      data: null
    });
  }

  authenticated():boolean{
    return this.userService.isAuthenticated();
  }
}
