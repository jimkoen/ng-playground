import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {from, map, timer} from "rxjs";

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      {{ this.publicTimer$ | async }}
    </p>
  `,
  styles: [
    `
      :host{
        background-color: red;
        min-width: 100px;
        min-height: 100px;
        display: inline-block;
      }
    `
  ]
})
export class OverlayComponent {
  private timer$ = timer(0, 1000)
  public publicTimer$ = from(this.timer$).pipe(map(v => "publicTimer: " + v.toString()))
  private privateTimer$ = from(this.timer$).pipe(map(v => "privateTimer: " + v.toString()))



}
