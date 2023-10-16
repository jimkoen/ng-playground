import { Injectable } from '@angular/core';
import {
  animationFrameScheduler, asapScheduler,
  BehaviorSubject,
  combineLatest,
  from,
  map, merge,
  Observable,
  observeOn, scan,
  share,
  shareReplay,
  Subject,
  switchMap
} from "rxjs";
import {roundToNearest} from "./utility";

@Injectable({
  providedIn: 'root'
})
export class ClickergameService {
  public readonly itemName : string = "Microchip"

  // BehaviorSubject used to update itemConsumersProducers$
  private readonly itemConsumersProducersUpdate$ : BehaviorSubject<Observable<bigint>[]>
    = new BehaviorSubject([] as Observable<bigint>[])

  // in each new value from itemConsumersProducersUpdate$, will emit an updated array of values from
  // all observables in the list held by itemConsumersProducersUpdate$
  private readonly itemConsumersProducers$ = this.itemConsumersProducersUpdate$.pipe(
    map(observablesList => {
      return observablesList
    }),
    );

  public readonly producerCount$ = this.itemConsumersProducersUpdate$.pipe(
    map(v => v.length)
  )

  public readonly itemCount$ = from(this.itemConsumersProducers$).pipe(
    /*scan((val, acc,) => {
      return val + acc
    }, 0n),*/
  )


  public readonly price$ : BehaviorSubject<number> = new BehaviorSubject<number>(0.01)

  public readonly demand$ = this.price$.pipe(
    map(v => this.calculateDemandFromCoefficient(v)),
    shareReplay(1)
  )

  private calculateDemandFromCoefficient(itemValueCoefficient : number){
    return (Math.pow(4*itemValueCoefficient, Math.sin(2*Math.E)) *10.42)
  }


  constructor() { }

  public addConsumerProducer(conprod : Observable<bigint>){
    let previousConsumersProducers = this.itemConsumersProducersUpdate$.getValue()
    this.itemConsumersProducersUpdate$.next([...previousConsumersProducers, conprod])
  }


}
