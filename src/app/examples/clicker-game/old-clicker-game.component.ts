import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animationFrameScheduler,
  BehaviorSubject, distinct, distinctUntilChanged,
  filter,
  interval,
  map,
  merge,
  Observable, repeat,
  scan, scheduled,
  shareReplay,
  startWith,
  Subject, switchMap, takeLast, takeUntil, tap,
  timer
} from "rxjs";
import {RoundToNearestPipe} from "./pipes/DecimalPlacesPipe/decimal-places.pipe";
import {FixedDecimalPlacesPipe} from "./pipes/FixedDecimalPipe/fixed-decimal.pipe";
import {roundToNearest} from "./utility";


interface GameState{
  itemCount : bigint
  demand : number
  price: number
  priceIncrement: number
}


enum GameInteractions{
  NONE,
  MAKE_ITEM_BY_HAND,
  DESTROY_ITEM_BY_HAND,
  BUY_SOMETHING_WITH_MONEY
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
    <p>Time interval: {{ this.lastAnimationFrameTimestamp$ | async }}</p>
    <p>
      Microchips: {{ itemCount$ | async }}
    </p>
    <button (click)="this.guiInteraction$.next(GameInteractions.MAKE_ITEM_BY_HAND)">Make Microchip</button>
    <button (click)="this.guiInteraction$.next(GameInteractions.DESTROY_ITEM_BY_HAND)">Destroy Microchip</button>
    <p>Funds: $ {{ this.funds$ | async }}</p>
    <p>Demand: {{ demand$ | async | roundToNearest:1e2 | fixedDecimalPlaces:2 }}%</p>
    <p>Price per Chip: $ {{ price$ | async | roundToNearest:1e2 | fixedDecimalPlaces:2 }}</p>
    <button (click)="incrementPriceCoefficientBy$.next(1)">Increase Price</button>
    <button (click)="decrementPriceCoefficientBy$.next(1)" [disabled]="disableDecrementPriceAction$ | async">Decrease Price</button>

  `,
  styles: [
  ]
})
export class OldClickerGameComponent implements OnInit{

  lastAnimationFrameTimestamp$ : BehaviorSubject<DOMHighResTimeStamp> = new BehaviorSubject(performance.timeOrigin)

  public readonly itemBuyAmountRange$ = new BehaviorSubject<[bigint, bigint]>([1n, 10n])

  public readonly guiInteraction$ : BehaviorSubject<GameInteractions> = new BehaviorSubject<GameInteractions>(GameInteractions.NONE)

  public readonly incrementItemAction$ =
    merge(
      this.guiInteraction$.pipe(
        filter(act => act === GameInteractions.MAKE_ITEM_BY_HAND)),
    )
  public readonly decrementItemAction$ =
    merge(
      this.guiInteraction$.pipe(
        filter(act => act === GameInteractions.DESTROY_ITEM_BY_HAND)),
    )
  public readonly itemCount$ =
    merge(
      this.incrementItemAction$.pipe(map(() : bigint => 1n)),
      this.decrementItemAction$.pipe(map(() : bigint => -1n))
    ).pipe(
      startWith(0n),
      scan<bigint, bigint>((count, change) => count + change, 0n)
    )

  public readonly noMoreItemsLeft$ : Observable<boolean> = this.itemCount$.pipe(
    map(count => count <= 0),
    distinctUntilChanged()
  )

  public readonly itemsBelowMinimumBuyAmount$ : Observable<boolean> = this.itemCount$.pipe(
    map(count => count <= 0),
  )

  /*public readonly itemSaleTimer$ = this.noMoreItemsLeft$.pipe(
    filter((v) => v === true),
    switchMap(() => timer(1000).pipe(
      map(v => 5n)
    ))
  )*/



// todo: probably not smart having funds as an observable, as total funds are the result of sale specific things
  public readonly funds$= merge(
    this.guiInteraction$.pipe(
      filter(act => act === GameInteractions.BUY_SOMETHING_WITH_MONEY)
    ),
  ).pipe(
    startWith(0),
    scan((count, change) => count + this.price$.value, 0)
  )


  public readonly incrementPriceCoefficientBy$ : Subject<number> = new Subject<number>()
  public readonly decrementPriceCoefficientBy$ : Subject<number> = new Subject<number>()


  //todo: figure out why this has to be BehaviorSubject and cannot be Subject
  public readonly price$ : BehaviorSubject<number> = new BehaviorSubject<number>(0)
  public readonly demand$ : BehaviorSubject<number> = new BehaviorSubject<number>(0)



  private priceChange$ =
      merge(
        this.incrementPriceCoefficientBy$.pipe(map((amount) : number => amount)),
        this.decrementPriceCoefficientBy$.pipe(map((amount) : number => -amount))
      ).pipe(
        startWith(5),
        scan((current, amount) => current + amount, 0),
        map(priceChange => this.calculateAbsolutePriceFromChange(priceChange)),
        shareReplay(1)
      )

  private demandChange$ = this.priceChange$.pipe(
    map(newPrice => this.calculateDemand(newPrice))
  )
  //public readonly demand$ = BehaviorSubject


    public readonly disableDecrementPriceAction$ = this.price$.pipe(map(p => {
    return p <= 1.0;
  }))


  // represents the factor by which a price increases or decreases on change


  constructor() {

    interval(0, animationFrameScheduler)
      .pipe(
        takeUntil(timer(100)),
        takeLast(1),
        repeat(),
      ).subscribe(this.lastAnimationFrameTimestamp$)


    this.priceChange$.subscribe(this.price$)
    this.demandChange$.subscribe(this.demand$)

    this.funds$.subscribe(v => console.log("Funds: ", v))

  }

  /*public makeItemByHand(){
    this.addItemToGlobalCounter(1n)
  }*/

  /*private addItemToGlobalCounter(itemCount : bigint){
    this.itemCount$.next(this.itemCount$.value + itemCount)
  }*/

  /*calculateDemandFromPrice(p : number = this.demand$){
    return Math.pow(p, -1 * Math.E * 0.55)
  }*/

  // todo: check if possible to remove arguments from 'calculateAbsolutePriceFromChange'
  public calculateAbsolutePriceFromChange(i : number){
    return roundToNearest(1 + Math.pow(i, Math.E) * .00021, 1e2)
  }

  public calculateDemand(itemPrice : number){
    return 1/(0.001*itemPrice)
  }

  protected readonly GameInteractions = GameInteractions;

  ngOnInit(): void {
  }
}
