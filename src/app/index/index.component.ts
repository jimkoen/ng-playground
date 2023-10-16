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
        <article>
          <h3>Clickergame</h3>
          <p>This section revolves around clickergame components implemented in Angular</p>
          <article>
            <h4>Game</h4>
            <nav>
              <ul>
                <li>
                  <a [routerLink]="'clickergame/game'">
                    <h5>The Game</h5>
                    <p>Click here to play the game</p>
                  </a>
                </li>
              </ul>
            </nav>
          </article>
        </article>
        <article>
          <h3>rxjs</h3>
          <p>This section revolves around the use of RXJS</p>
          <article>
            <h4>Transforms</h4>
            <nav>
              <ul>
                <li>
                  <a [routerLink]="'rxjs/transformation-operators/example1'">
                    <h5>Scans</h5>
                    <p>Click here for an example for the scan filter</p>
                  </a>
                </li>
              </ul>
            </nav>
          </article>
          <article>
            <h4>Timing</h4>
            <nav>
              <ul>
                <li>
                  <a [routerLink]="'rxjs/timing/reset-interval-example'">
                    <h5>Scans</h5>
                    <p>An example that shows a resettable interval timer</p>
                  </a>
                </li>
              </ul>
            </nav>
          </article>
        </article>
        <article>
          <h3>Directives</h3>
          <p>This section revolves around the use of directives</p>
          <article>
            <h4>Misc</h4>
            <nav>
              <ul>
                <li>
                  <a [routerLink]="'directives/misc/overlay-example'">
                    <h5>Overlay</h5>
                    <p>Click here for an example on using directives for dynamic overlays</p>
                  </a>
                </li>
              </ul>
            </nav>
          </article>
        </article>
        <article>
          <h3>D3.js</h3>
          <p>This section revolves around the use of D3.js in Angular</p>
          <article>
            <h4>Basics</h4>
            <nav>
              <ul>
                <li>
                  <a [routerLink]="'d3js/basics/import'">
                    <h5>Import</h5>
                    <p>Click here for an example on how to import D3js in Angular and rendering a simple chart.</p>
                  </a>
                </li>
              </ul>
            </nav>
          </article>
          <article>
            <h4>Observability</h4>
            <nav>
              <ul>
                <li>
                  <a [routerLink]="'d3js/observable/zoom-to-bounding-box'">
                    <h5>Zoom to Bounding Box / Reacting to state changes</h5>
                    <p>This example shows how to react to state changes in a D3js chart, via the infamous <em>Zoom to bounding box</em>block, reimplemented in Angular.</p>
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
