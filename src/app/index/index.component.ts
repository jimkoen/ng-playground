import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header>
      <h1>Angular Playground</h1>
    </header>

    <main>
      <section>
        <h2>Categories</h2>
        <article>
          <h3>Angular API Experiments</h3>
          <p>Explore Angular APIs through these interactive experiments.</p>
        </article>

        <article>
          <h3>Web API Experiments</h3>
          <p>Discover the capabilities of different Web APIs with these interactive examples.</p>
            <article>
              <h4>Intersection Observer API</h4>
                <nav>
                  <ul>
                    <li>
                      <a [routerLink]="'web-apis/intersection-observer-api/basic-scroll'">
                        <h5>Basic Scroll Example</h5>
                        <p>This example is a replica of those found in the MDN documentation</p>
                      </a>
                    </li>
                    <li>
                      <a [routerLink]="'web-apis/intersection-observer-api/color-drag'">
                        <h5>Color Drag Example</h5>
                        <p>This example shows how one component can react to changes in the observer</p>
                      </a>
                    </li>
                    <li>
                      <a [routerLink]="'web-apis/intersection-observer-api/scroll-content-load'">
                        <h5>Scroll to load content</h5>
                        <p>This example shows an infinite scrolling scenario where content is dynamically loaded with help of an intersection observer</p>
                      </a>
                    </li>
                  </ul>
                </nav>
            </article>
        </article>
        <article>
          <h3>Angular + Three.js</h3>
          <p>See how you can make Angular work with Three.js.</p>
          <article>
            <h4>Misc</h4>
            <nav>
              <ul>
                <li>
                  <a [routerLink]="'angular-threejs/misc/geometry-load'">
                    <h5>Geometry Performance Test</h5>
                    <p>This example measures how fast different Geometry can be loaded in and changed</p>
                  </a>
                </li>
              </ul>
            </nav>
          </article>
        </article>
        <article>
          <h3>Angular + Pocketbase</h3>
          <p>See how you can connect Angular with a Pocketbase based backend.</p>
          <article>
            <h4>Misc</h4>
            <nav>
              <ul>
                <li>
                  <a [routerLink]="'angular-pocketbase/misc/untitled1'">
                    <h5>Untitled example</h5>
                    <p>Not sure what I will do with this yet</p>
                  </a>
                </li>
              </ul>
            </nav>
          </article>
        </article>
      </section>
    </main>

    <footer>
      <p>&copy; 2023 Lucca Jiménez Könings. All rights reserved.</p>
    </footer>
  `,
  styles: [
  ]
})
export class IndexComponent {

}
