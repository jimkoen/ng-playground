import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {BasicScrollComponent} from "./examples/web-apis/intersection-observer-api/basic-scroll/basic-scroll.component";
import {ColorDragComponent} from "./examples/web-apis/intersection-observer-api/color-drag/color-drag.component";
import {GeometryLoadComponent} from "./examples/threejs/misc/geometry-load/geometry-load.component";
import {
  ScrollContentLoadComponent
} from "./examples/web-apis/intersection-observer-api/scroll-content-load/scroll-content-load.component";

const threejsRoutes: Routes = [
  {
    path: "misc",
    children: [
      {
        path: "geometry-load",
        component: GeometryLoadComponent
      },
    ]
  }
]


const webAPIRoutes : Routes = [
  {
    path: "intersection-observer-api",
    children: [
      {
        path: "basic-scroll",
        component: BasicScrollComponent
      },
      {
        path: "color-drag",
        component: ColorDragComponent
      },
      {
        path: "scroll-content-load",
        component: ScrollContentLoadComponent
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
  },
  {
    path: "angular-threejs",
    children: threejsRoutes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
