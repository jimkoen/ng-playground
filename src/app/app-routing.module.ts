import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {
  IntersectionObserverExampleComponent
} from "./examples/intersection-observer-example/intersection-observer-example.component";

const routes: Routes = [
  {
    path: "intersectionObserver",
    component: IntersectionObserverExampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
