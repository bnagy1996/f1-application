import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RouteParamService {

  params: any;

  constructor(public router: Router, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe(routerParams => {
      this.params = routerParams
    });
  }

  paginationQueryParams(page:number,size:number,sort:string,asc:string) {
    let params = { 
      page: page,
      size: size,
      sort: sort,
      asc: asc
    }

    this.params = params
    this.router.navigate(
        [], 
        { 
            queryParams: params,
            queryParamsHandling: 'merge',
        }
    );
  }


  onParamChange(){
    return this.activatedRoute.queryParams
  }
}
