import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularDraggableModule } from "angular2-draggable";
import {IntersectionObserveeService, IntersectionObserverDirective} from "@ng-web-apis/intersection-observer";


@Component({
  selector: 'app-color-draggable',
  providers: [IntersectionObserveeService],
  standalone: true,
  imports: [CommonModule, AngularDraggableModule],
  template: `
    <section class="draggable">
      <p>Drag me!</p>
    </section>
  `,
  styles: [
    `
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
export class ColorDraggableComponent {
  constructor(@Inject(IntersectionObserveeService) entries$: IntersectionObserveeService) {
    entries$.subscribe(entries => {
      // Don't forget to unsubscribe
      entries.forEach(entry => console.log(entry))
    })
  }
}
