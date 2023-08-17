import { Pipe, PipeTransform } from '@angular/core';


function isNumberType(arg : unknown) : boolean{
    return typeof arg === 'number'
}
@Pipe({
  name: 'fixedDecimalPlaces',
  standalone: true
})
export class FixedDecimalPlacesPipe implements PipeTransform {

  transform(value: number | null, dec: number = 2): number | string {
    if(!value){
      console.error("FixedAtDecimalPlacesPipe: argument 'value' is null!")
      return "Null"
    }else if(!isNumberType(value)){
      console.error("FixedAtDecimalPlacesPipe: argument 'value' is not a number type!")
      return NaN
    }else if(isNaN(value)){
      console.error("FixedAtDecimalPlacesPipe: argument 'value' is NaN!")
      return NaN
    }
    return value.toFixed(dec)
  }

}
