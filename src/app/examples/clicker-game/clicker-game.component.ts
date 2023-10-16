import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FixedDecimalPlacesPipe} from "./pipes/FixedDecimalPipe/fixed-decimal.pipe";
import {RoundToNearestPipe} from "./pipes/DecimalPlacesPipe/decimal-places.pipe";
import {ClickergameService} from "./clickergame.service";
import {roundToNearest} from "./utility";
import {fromEvent, map, merge, Observable, scan, shareReplay, startWith, tap} from "rxjs";
import {PercentagePipe} from "./pipes/PercentagePipe/percentage.pipe";
import {testProducer} from "./stage1/itemProducers/test-producer";

@Component({
  selector: 'app-clicker-game',
  standalone: true,
  imports: [CommonModule, FixedDecimalPlacesPipe, RoundToNearestPipe, PercentagePipe],
  template: `
    <p>{{this.game.itemName}}s: {{this.game.itemCount$ | async}}</p>
    <button #makeItem>Make {{this.game.itemName}}</button>
    <p>Price per Chip: $ {{ this.game.price$ | async | roundToNearest:1e2 | fixedDecimalPlaces:2 }} </p>
    <p>Demand: {{ this.game.demand$ | async | percentage | fixedDecimalPlaces:2 }}%</p>
    <p>Price coefficient: {{ this.priceCoefficient$ | async }}</p>
    <button #increasePrice>Increase Price</button>
    <button #decreasePrice [disabled]="this.disablePriceDecrease$ | async">Decrease Price</button>
    <button #addProducer>Add Producer</button>
    <p>Producers: {{ this.game.producerCount$ | async }}</p>
  `,
  styles: [
  ]
})
export class ClickerGameComponent implements AfterViewInit{
  @ViewChild('makeItem') makeItemButton: ElementRef | undefined
  @ViewChild('increasePrice') increasePriceButton: ElementRef | undefined
  @ViewChild('decreasePrice') decreasePriceButton: ElementRef | undefined
  @ViewChild('addProducer') addProducerButton: ElementRef | undefined


  public disablePriceDecrease$ : Observable<boolean> | undefined
  public makeItemAction$ : Observable<bigint> | undefined
  public priceChangeAction$ : Observable<number> | undefined
  public priceCoefficient$ : Observable<number> | undefined
  public addProducer$ : Observable<any> | undefined
  constructor(public readonly game : ClickergameService) {
  }

  ngAfterViewInit() {
    setTimeout(() =>{
      this.makeItemAction$ = fromEvent(this.makeItemButton?.nativeElement, 'click')
        .pipe(
          map(() => 1n),
          scan((acc, val) => (acc + val), 0n ),
          startWith(0n),
          shareReplay(1)
          )

      this.game.addConsumerProducer(this.makeItemAction$)

      this.priceChangeAction$ = merge(
        fromEvent(this.increasePriceButton?.nativeElement, 'click').pipe(map( () => 1)),
        fromEvent(this.decreasePriceButton?.nativeElement, 'click').pipe(map(() => -1)),
      )

      this.priceCoefficient$ = this.priceChangeAction$.pipe(
        startWith(200),
        scan((acc, value) => acc + value, 0),
      )

      this.disablePriceDecrease$ = this.priceCoefficient$.pipe(map(v => {return v <= 1}))
      this.priceCoefficient$.pipe(
        map(v => this.calculateItemPriceFromCoefficient(v))).subscribe(this.game.price$)

      this.addProducer$ = fromEvent(this.addProducerButton?.nativeElement, 'click')
      this.addProducer$.subscribe(() => this.game.addConsumerProducer(testProducer()))
    })


  }

  public calculateItemPriceFromCoefficient(itemValueCoefficient : number){
    return roundToNearest(0.01 + (Math.pow(itemValueCoefficient, Math.E) / (itemValueCoefficient*300)), 1e2)
  }



  protected readonly map = map;
}
