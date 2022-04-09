import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/account-managment/details/details.component';
import { LoginComponent } from './components/account-managment/login/login.component';
import { RegistrationComponent } from './components/account-managment/registration/registration.component';
import { FormulaTeamListComponent } from './components/formula-team-list/formula-team-list.component';
import { FormulaTeamComponent } from './components/formula-team/formula-team.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormulateamService } from './services/formulateam/formulateam.service';
import { UserDetailService } from './services/user/user-detail.service';


export const mainRoutes: Routes = [
  { path: '',  component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'details', component: DetailsComponent, canActivate: [UserDetailService]},
  { path: 'registration', component: RegistrationComponent },
  { path: 'formulateams', component: FormulaTeamListComponent },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(mainRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
