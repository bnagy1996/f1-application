import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { FormulaTeamData } from 'src/app/data/formula-team-data';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base-service';
import { options, optionsForTextResponse } from '../options';
import { RouteParamService } from '../route-param/route-param.service';
import { UserDetailService } from '../user/user-detail.service';

@Injectable({
  providedIn: 'root'
})
export class FormulateamService extends BaseService implements CanActivate{
  
  updateTeams:Subject<void> = new Subject<void>();

  constructor(private userService: UserDetailService,private routerService:RouteParamService,) {
    super();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userService.isAuthenticated()
  }

  getTeamObservable(){
    return this.updateTeams.asObservable()
  }

  nextTeam(){
    this.updateTeams.next()
  }

  getTeams(){
    let opt:any = _.clone(options)
    opt["params"] = {
      'page': Number.parseInt(this.routerService.params['page']),
      'size': Number.parseInt(this.routerService.params['size']),
      'sort': this.routerService.params['sort'],
      'asc':  this.routerService.params['asc'],
      }

    return this.http.get<any>(environment.formulaTeamUrl,opt)
  }

  addTeam(newTeam:FormulaTeamData){
    let opt:any = _.clone(options)
    return this.http.post<any>(environment.formulaTeamUrl,newTeam, opt)
  }

  updateTeam(id:number,team:FormulaTeamData){
    let opt:any = _.clone(options)
    opt["params"] = {
      'id':id,
      }
    return this.http.put<any>(environment.formulaTeamUrl,team, opt)
  }

  deleteTeam(id:number){
    let opt:any = _.clone(options)
    opt["params"] = {
      'id': id,
      }
    return this.http.delete<any>(environment.formulaTeamUrl,opt)
  }
}
