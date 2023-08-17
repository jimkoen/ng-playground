import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundToNearest',
  standalone: true
})
export class RoundToNearestPipe implements PipeTransform {

  transform(value: number | null, dec: 1e2): number {
    if(!value){
      console.error("RoundToNearestPipe: argument 'value' is null!")
      return NaN
    }
    return Math.round((value + Number.EPSILON) * dec) / dec
  }

}
