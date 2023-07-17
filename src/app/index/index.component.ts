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
