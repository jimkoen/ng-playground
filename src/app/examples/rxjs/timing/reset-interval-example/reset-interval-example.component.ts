import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  filter,
  first,
  fromEvent,
  interval,
  last,
  map,
  mapTo,
  Observable,
  scan,
  startWith, Subject,
  switchMap, takeUntil,
  takeWhile,
  tap,
  timer
} from "rxjs";

@Component({
  selector: 'app-reset-interval-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Timer reset via DOM event </h1>
    <div class="timer-container">
      <div class="timer-indicator" *ngFor="let values of resetTimer$ | async; index as i">
        {{ i + 1 }}
      </div>
    </div>
    <button #reset>Reset Timer</button>
    <h1>Random timer reset on expire </h1>
    <div class="timer-container">
      <div class="timer-indicator" *ngFor="let values of expiringTimer$ | async; index as i">
        {{ i }}
      </div>
    </div>
    <button #start>Start Timer</button>
    <button #stop>Stop Timer</button>



  `,
  styles: [
    `
      .timer-indicator{
        background-color: crimson;
        width: 10px;
        height: 10px;
        margin: 5px;
      }
      .timer-container{
        border: 5px solid black;
        width: 100px;
        height: 100px;
        margin: 100px;
      }
    `
  ]
})
export class ResetIntervalExampleComponent implements AfterViewInit{
  @ViewChild('reset') reset_button: ElementRef | undefined
  @ViewChild('start') start_button: ElementRef | undefined
  @ViewChild('stop') stop_button: ElementRef | undefined


  public resetTimer$ : Observable<number[]> | undefined

  public expiringTimer$ : Observable<number[]> | undefined

  public timerExpired$ : Observable<number[]> | undefined

  public resetExpiredTimer$ : Subject<any> | undefined

  constructor() {
  }

  ngAfterViewInit() {

    fromEvent(this.reset_button?.nativeElement, 'click').subscribe(this.resetExpiredTimer$)

    this.resetTimer$ = fromEvent(this.reset_button?.nativeElement, 'click').pipe(
      startWith(Array(10) as number[]),
      switchMap(() => timer(0, 1000).pipe(
        map( v => -1),
        scan((acc, value) => Array(acc.length + value), Array(11) as number[]),
        takeWhile(v => v.length > 0, true)
      )),
    )



    this.expiringTimer$ = fromEvent(this.reset_button?.nativeElement, 'click').pipe(
      startWith(Array(10) as number[]),
      switchMap(() => timer(0, 1000).pipe(
        map( v => -1),
        scan((acc, value) => Array(acc.length + value), Array(11) as number[]),
        takeUntil(this.resetExpiredTimer$ as Subject<any>)
      )),
    )

    this.timerExpired$ = this.expiringTimer$.pipe(filter(v => v.length <= 0))
    this.timerExpired$.subscribe(this.resetExpiredTimer$)


  }

}
