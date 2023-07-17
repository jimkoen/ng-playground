import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IntersectionObserverModule} from "@ng-web-apis/intersection-observer";


@Component({
  selector: 'app-basic-scroll',
  standalone: true,
  imports: [CommonModule, IntersectionObserverModule],
  template: `
    <section waIntersectionRoot class="intersection-root">
      <div class="container border-mark intersection-observee small"
           waIntersectionObserver
           waIntersectionThreshold="0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1"
           (waIntersectionObservee)="onIntersect($event, 0)"
      >
        <span class="intersection-percentage top left">{{ intersectionPercentage[0]  }}</span>
        <span class="intersection-percentage top right">{{ intersectionPercentage[0]  }}</span>
        <span class="intersection-percentage bottom left">{{ intersectionPercentage[0]  }}</span>
        <span class="intersection-percentage bottom right">{{ intersectionPercentage[0]  }}</span>
      </div>
      <div class="container border-mark intersection-observee">
        <span class="intersection-percentage top left">Not being observed</span>
      </div>
      <div class="container border-mark intersection-observee">
        <span class="intersection-percentage top left">Not being observed</span>
      </div>
      <div class="container border-mark intersection-observee small"
           waIntersectionObserver
           waIntersectionThreshold="0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1"
           (waIntersectionObservee)="onIntersect($event, 1)"
      >
        <span class="intersection-percentage top left">{{ intersectionPercentage[1] }}</span>
        <span class="intersection-percentage top right">{{ intersectionPercentage[1]  }}</span>
        <span class="intersection-percentage bottom left">{{ intersectionPercentage[1]  }}</span>
        <span class="intersection-percentage bottom right">{{ intersectionPercentage[1]  }}</span>
      </div>
      <div class="container border-mark intersection-observee">
        <span class="intersection-percentage top left">Not being observed</span>
      </div>
      <div class="container border-mark intersection-observee small"
           waIntersectionObserver
           waIntersectionThreshold="0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1"
           (waIntersectionObservee)="onIntersect($event, 2)"
      >
        <span class="intersection-percentage top left">{{ intersectionPercentage[2] }}</span>
        <span class="intersection-percentage top right">{{ intersectionPercentage[2] }}</span>
        <span class="intersection-percentage bottom left">{{ intersectionPercentage[2] }}</span>
        <span class="intersection-percentage bottom right">{{ intersectionPercentage[2] }}</span>
      </div>
      <div class="container border-mark intersection-observee">
        <span class="intersection-percentage top left">Not being observed</span>
      </div>
    </section>
  `,
  styles: [`
    :host{
      font-family: sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 100vh;
    }
    .intersection-root{

      background-color: lightgray;
      display: flex;
      flex-direction: column;
      overflow: scroll;
      justify-content: space-between;
      max-height: 50vh;
    }

    .border-mark{
      border: 1px solid black;
    }

    .container{
      margin: 0.5em;
    }
    .intersection-observee{
      position: relative;
      min-height: 100px;
      background-color: antiquewhite;
    }

    .tall{
      min-height: 400px;
    }

    .medium{
      min-height: 300px;
    }

    .small{
      min-height: 150px;
    }

    .intersection-percentage{
      background-color: lightsalmon;
      position: absolute;
      margin: 0;
      border: 1px solid black;
      padding: 2px;
    }
    .intersection-percentage.left{
      left: 2px;
    }
    .intersection-percentage.right{
      right: 2px;
    }
    .intersection-percentage.bottom{
      bottom: 2px;

    }
    .intersection-percentage.top{
      top: 2px;

    }
  `,]
})
export class BasicScrollComponent {
  public intersectionPercentage : number[] = [];

  onIntersect($event : IntersectionObserverEntry[], element : number){
    this.intersectionPercentage[element] = Math.round(($event[0].intersectionRatio + Number.EPSILON) * 1e2)/1e2
  }
  /*static generateThresholds(begin : number, end : number, granularity : number){
    granularity = granularity - 1
    let thresholds : number[] = []
    let difference = end - begin
    let thresholdInterval = difference / granularity
    for(let i = 0; i <= granularity; i++){
      let value = begin + thresholdInterval * i
      // round to 2 decimals
      thresholds.push(Math.round( (value + Number.EPSILON) * 1e2) / 1e2)
    }
    return thresholds
  }*/
}
