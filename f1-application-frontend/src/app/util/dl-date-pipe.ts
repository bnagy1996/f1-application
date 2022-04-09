import { Pipe, PipeTransform } from '@angular/core';
   import { DatePipe } from '@angular/common';
   
   @Pipe({
     name: 'dlDateConverter'
   })
   export class DlDateConverterPipe extends 
                DatePipe implements PipeTransform {
     override transform(value: any, args?: any): any {
       //console.log("DATE: " + JSON.stringify(value))
       if(value == null)
        return null

       let date = value.slice(0, 3).join('/')
       let newDate = new Date(date)
       return newDate;
     }
   }