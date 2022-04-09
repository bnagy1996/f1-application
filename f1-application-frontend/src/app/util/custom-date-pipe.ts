import { Pipe, PipeTransform } from '@angular/core';
   import { DatePipe } from '@angular/common';
   
   @Pipe({
     name: 'dlDate'
   })
   export class DlDatePipe extends 
                DatePipe implements PipeTransform {
     override transform(value: any, args?: any): any {
       //console.log("DATE: " + JSON.stringify(value))
       if(value == null)
        return null

       let date = value.slice(0, 3).join('/')
       return super.transform(date, "YYYY. MM. dd.");
     }
   }