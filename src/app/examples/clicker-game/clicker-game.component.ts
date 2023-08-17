import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BehaviorSubject, timer} from "rxjs";
import {RoundToNearestPipe} from "./pipes/DecimalPlacesPipe/decimal-places.pipe";
import {FixedDecimalPlacesPipe} from "./pipes/FixedDecimalPipe/fixed-decimal.pipe";


interface GameState{
  demand : number
  price: number
  priceIncrement: number
}

//todo: figure out exactly how and why this function does what it does
// so that i don't get copyright issues and am able to write a potentially
// more readable version
const roundToDecimals = (arg : number, dec : number) => {
  return Math.round((arg + Number.EPSILON) * dec) / dec
}
@Component({
  selector: 'app-clicker-game',
  standalone: true,
  imports: [CommonModule, RoundToNearestPipe, FixedDecimalPlacesPipe],
  template: `
    <p>
      Microchips: {{ itemCount$ | async }}
    </p>
    <button (click)="makeItemByHand()">Make Microchip</button>
    <p>Demand: {{ demand$ | async | roundToNearest:1e2 | fixedDecimalPlaces:2 }}%</p>
    <p>Price per Chip: $ {{ price$ | async | roundToNearest:1e2 | fixedDecimalPlaces:2 }}</p>
    <button (click)="increasePriceByNSteps(1)">Increase Price</button>
    <button (click)="decreasePriceByNSteps(1)">Decrease Price</button>

  `,
  styles: [
  ]
})
export class ClickerGameComponent {
  public readonly itemCount$ : BehaviorSubject<bigint> = new BehaviorSubject<bigint>(0n)
  public readonly demand$ : BehaviorSubject<number> = new BehaviorSubject<number>(0.35)
  public readonly price$ : BehaviorSubject<number>;
  private priceIncrement : number = 4;

  // represents the factor by which a price increases or decreases on change


  constructor() {
    this.price$ = new BehaviorSubject<number>(this.calculateAbsolutePriceFromIncrement())
    this.price$.subscribe((price: number) => {
      this.demand$.next(this.calculateDemandFromPrice(price))
    })
  }

  public makeItemByHand(){
    this.addItemToGlobalCounter(1n)
  }

  private addItemToGlobalCounter(itemCount : bigint){
    this.itemCount$.next(this.itemCount$.value + itemCount)
  }

  calculateDemandFromPrice(p : number = this.demand$.value){
    return Math.pow(p, -1 * Math.E * 0.55)
  }

  public calculateAbsolutePriceFromIncrement(i : number = this.priceIncrement){
    return Math.pow(i, Math.E) * .00021
  }
  private changePrice(steps : number){
    const newPrice = this.calculateAbsolutePriceFromIncrement(this.priceIncrement + steps)
    this.priceIncrement += steps;
    this.price$.next(newPrice);
  }

  public increasePriceByNSteps(steps : number){
    if(steps <= 0){
      throw Error("increasePrice: negative step size not allowed!")
    }else if(!Number.isInteger(steps)){
      throw Error("increasePrice: non integer step size not allowed!")
    }
    this.changePrice(steps)
  }

  public decreasePriceByNSteps(steps : number){
    if(steps <= 0){
      throw Error("increasePrice: negative step size not allowed!")
    }else if(!Number.isInteger(steps)){
      throw Error("increasePrice: non integer step size not allowed!")
    }
    this.changePrice(steps * -1)
  }



}
