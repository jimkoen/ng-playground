import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {BasicScrollComponent} from "./examples/web-apis/intersection-observer-api/basic-scroll/basic-scroll.component";

const webAPIRoutes : Routes = [
  {
    path: "intersection-observer-api",
    children: [
      {
        path: "basic-scroll",
        component: BasicScrollComponent
      }
    ]
  }
]

const routes: Routes = [
  {
    path: "",
    component: IndexComponent
  },
  {
    path: "web-apis",
    children: webAPIRoutes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
