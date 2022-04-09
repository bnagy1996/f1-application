import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DetailsComponent } from './components/account-managment/details/details.component';
import { FormulaTeamListComponent } from './components/formula-team-list/formula-team-list.component';
import { FormulaTeamComponent } from './components/formula-team/formula-team.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/account-managment/login/login.component';
import { RegistrationComponent } from './components/account-managment/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './inteceptors/bearer-tokem.interceptor';
import { DatepickerModule } from 'ng2-datepicker';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { DlDatePipe } from './util/custom-date-pipe';
import { DlDateConverterPipe } from './util/dl-date-pipe';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavBarComponent,
    DetailsComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegistrationComponent,
    DetailsComponent,
    FormulaTeamListComponent,
    FormulaTeamComponent,
    DlDatePipe,
    DlDateConverterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    AppRoutingModule,
    FontAwesomeModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: APP_BASE_HREF, useValue: ''},
    { provide: HTTP_INTERCEPTORS,useClass: TokenInterceptor,multi: true },
  ],
  entryComponents: [
    FormulaTeamComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  static injector: Injector;
  constructor(private injector: Injector) {
    AppModule.injector = injector;
  }
}