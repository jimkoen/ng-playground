import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IntersectionObserverModule} from "@ng-web-apis/intersection-observer";

@Component({
  selector: 'app-intersection-observer-example',
  standalone: true,
  imports: [CommonModule, IntersectionObserverModule],
  template: `
    <section waIntersectionRoot class="intersection-root">
      <div waIntersectionObserver waIntersectionThreshold="" (waIntersectionObservee)="onIntersect($event)" class="container intersection-observee">
        <span class="intersection-percentage">{{ intersectionPercentage1 }}</span>
      </div>
      <div waIntersectionObserver class="container intersection-observee">
        <span class="intersection-percentage">{{ intersectionPercentage2 }}</span>
      </div>
      <div waIntersectionObserver class="container intersection-observee">
        <span class="intersection-percentage">{{ intersectionPercentage3 }}</span>
      </div>
      <div waIntersectionObserver class="container intersection-observee">
        <span class="intersection-percentage">{{ intersectionPercentage4 }}</span>
      </div>
    </section>
  `,
  styleUrls: ['./intersection-observer-example.component.scss']
})
export class IntersectionObserverExampleComponent {
  public intersectionPercentage1 = 0
  public intersectionPercentage2 = 0
  public intersectionPercentage3 = 0
  public intersectionPercentage4 = 0

  public thresholds="0.1, 0.2, 0.3, 0.4, 0.5, 0.8"
  //public thresholds = IntersectionObserverExampleComponent.generateThresholds(0.1, 0.5, 10).toString()
  constructor() {
    console.log(this.thresholds)
  }

  onIntersect($event : IntersectionObserverEntry[]){
    console.log($event[0].intersectionRatio)
    console.log(this.thresholds)
  }

  static generateThresholds(begin : number, end : number, granularity : number){
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
  }
}
