import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularDraggableModule} from "angular2-draggable";
import {IntersectionObserveeService, IntersectionObserverDirective,
  IntersectionObserverModule,
} from "@ng-web-apis/intersection-observer";
import {BasicScrollComponent} from "../basic-scroll/basic-scroll.component";
import {ColorDraggableComponent} from "./color-draggable/color-draggable.component";

@Component({
  selector: 'app-color-drag',
  standalone: true,
  providers: [IntersectionObserverDirective],
  imports: [CommonModule, AngularDraggableModule, IntersectionObserverModule, ColorDraggableComponent],
  template: `
    <div class="flex-container flex-row">
      <div class="flex-container flex-col">
        <section class="target-area" waIntersectionRoot>
      <p>Target (without draggable component)</p>
        <section
          ngDraggable
          waIntersectionObserver
          waIntersectionThreshold="0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1"
          (waIntersectionObservee)="this.onIntersect($event)"
          class="draggable" [ngStyle]="{'background-color': this.linearGradient('rgb(0, 0, 255)','rgb(255, 0, 0)', this.intersectionRatio )}">
            <p>Drag me!</p>
            <p>{{ this.roundToDecimals(this.intersectionRatio, 1e2) }}</p>
        </section>
    </section>
        <section class="target-area" waIntersectionRoot>
          <p>Target (with draggable component)</p>
          <div ngDraggable>
            <app-color-draggable ></app-color-draggable>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [
    `
      :host{
        height: 100vh;
        width: 100vw;
        display: inline-block;
        background-color: lightsalmon;
      }
      .flex-container{
        display: flex;
        height: inherit;
        justify-content: center;
      }
      .flex-container.flex-row{
        flex-direction: row;
      }
      .flex-container.flex-col{
        flex-direction: column;
      }
    .target-area{
      margin: 1vh;
      width: 75vh;
      height: 75vh;
      border: 1px solid black;
      max-width: 300px;
      max-height: 300px;
    }

    .draggable{
      background-color: blue;
      display: inline-block;
      height: 50vh;
      width: 50vh;
      max-height: 150px;
      max-width: 150px;
      border-radius: 100%;
    }
  `
  ],
})
export class ColorDragComponent {
  public intersectionRatio : number = 0
  constructor() {
  }
  onIntersect($event : IntersectionObserverEntry[]){
    this.intersectionRatio = $event[0].intersectionRatio
  }

  linearGradient(color1: string, color2: string, ratio: number): string {
    // Parse color values
    const rgb1 = color1.match(/\d+/g)!.map(Number);
    const rgb2 = color2.match(/\d+/g)!.map(Number);

    // Calculate interpolated RGB values
    const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * ratio);
    const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * ratio);
    const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * ratio);

    // Format the interpolated RGB values as a CSS color string
    return `rgb(${r}, ${g}, ${b})`;
  }

   public roundToDecimals = (arg : number, dec : number) => {
    return Math.round((arg + Number.EPSILON) * dec) / dec
  }
  protected readonly BasicScrollComponent = BasicScrollComponent;
}
