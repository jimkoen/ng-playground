import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
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
        </article>
      </section>
    </main>

    <footer>
      <p>&copy; 2023 Lucca Jiménez Könings. All rights reserved.</p>
    </footer>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Playground';
}
