import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { FormulaTeamData } from 'src/app/data/formula-team-data';
import { FormulateamService } from 'src/app/services/formulateam/formulateam.service';
import { RouteParamService } from 'src/app/services/route-param/route-param.service';
import { UserDetailService } from 'src/app/services/user/user-detail.service';
import { AutoDestroy } from 'src/app/util/auto-destroy';
import { FormulaTeamComponent } from '../formula-team/formula-team.component';

@Component({
  selector: 'app-formula-team-list',
  templateUrl: './formula-team-list.component.html',
  styleUrls: ['./formula-team-list.component.scss'],
  viewProviders: [AutoDestroy]
})
export class FormulaTeamListComponent implements OnInit {

  public dataSource = new MatTableDataSource<FormulaTeamData>();
  public displayedColumns = ['position', 'name', 'foundationDate', 'numberOfConstructorWins', 'actions'];
  // public  list:Array<FormulaTeamData> | undefined
  public  collectionSize:number = 0
  pageSizeOptions: number[] = [9];

  pageEvent: PageEvent | undefined;

  @ViewChild('paginator', { static: true }) paginator: any;

  page:number = 0
  size:number = 9
  asc:string = "asc"
  sort:string = "name"

  constructor(private routerService:RouteParamService,
              private userService:UserDetailService,
              private teamService:FormulateamService,
              readonly destroy:AutoDestroy,
              private readonly dialog: MatDialog) { 

    this.routerService.onParamChange().pipe(takeUntil(destroy)).subscribe(o => {
      this.loadFormulaTeamData()
    })

    this.dialog.afterAllClosed.pipe(takeUntil(destroy)).subscribe(() => {
      this.loadFormulaTeamData()
    })

    this.teamService.getTeamObservable().pipe(takeUntil(destroy)).subscribe(() => {
      this.loadFormulaTeamData()
    })
  }



  ngOnInit(): void {
    if(this.userService.isAuthenticated()){
      this.displayedColumns = ['position', 'name', 'foundationDate', 'numberOfConstructorWins', 'actions'];
    }
    else{
      this.displayedColumns = ['position', 'name', 'foundationDate', 'numberOfConstructorWins'];
    }


    this.page = Number.parseInt(this.routerService.params["page"])
    this.size = Number.parseInt(this.routerService.params["size"])
    this.asc = this.routerService.params["asc"]
    this.sort = this.routerService.params["sort"]
    this.pageSizeOptions = [this.size]
    this.updateQueryParams()
    this.paginator.pageIndex = this.page
  }

  loadPage(event?:PageEvent): PageEvent | undefined{
    let page =  event!.pageIndex
    if(!Number.isNaN(page) && (page) != this.page){
        this.page = page
        this.updateQueryParams()
    }

    return event
  }

  announceSortChange(sortState: Sort) {
    this.sort = sortState.active
    if(!sortState.direction){
      this.asc = "asc"
    }
    else{
      this.asc = sortState.direction
    }
    
    this.updateQueryParams()
  }

  edit(id:number){
    this.dialog.open(FormulaTeamComponent, {
      width: '50rem',
      height: '40rem',
      data: this.getTeam(id)
    });
  }

  loadFormulaTeamData(){
    this.teamService.getTeams().subscribe({
      next: (r) => this.success(r),
      error: (e) => this.error(e)
    })
  }

  success(resp:any){
    //console.log("Response: "+JSON.stringify(resp))
    this.page = Number.parseInt(resp.pageable.pageNumber)
    this.size = Number.parseInt(resp.pageable.pageSize)
    this.collectionSize = Number.parseInt(resp.totalElements)
    this.dataSource.data = resp.content
  }

  error(error:any){
    console.log("Response: "+JSON.stringify(error))
    this.teamService.snackbarErrorMessage("Error")
  }

  updateQueryParams(){
    this.routerService.paginationQueryParams(this.page,this.size,this.sort,this.asc)
  }

  private getTeam(id:number):FormulaTeamData | undefined{
    return this.dataSource.data.find(o => o.id == id)
  }

}
