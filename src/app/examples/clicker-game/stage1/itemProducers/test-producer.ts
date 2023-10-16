import {
  animationFrameScheduler,
  from,
  interval,
  map,
  Observable,
  observeOn,
  scan,
  shareReplay,
  switchMap,
  tap,
  timer
} from "rxjs";

export function testProducer() : Observable<bigint>{
  return interval(1337).pipe(
    map(v => 1n),
    scan((acc, value) => acc + value, 0n),
    shareReplay(1),
    observeOn(animationFrameScheduler)
  )
}
