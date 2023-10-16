import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {BasicScrollComponent} from "./examples/web-apis/intersection-observer-api/basic-scroll/basic-scroll.component";
import {ColorDragComponent} from "./examples/web-apis/intersection-observer-api/color-drag/color-drag.component";
import {GeometryLoadComponent} from "./examples/threejs/misc/geometry-load/geometry-load.component";
import {
  ScrollContentLoadComponent
} from "./examples/web-apis/intersection-observer-api/scroll-content-load/scroll-content-load.component";
import {BasicCRUDExampleComponent} from "./examples/pocketbase/misc/basic-crudexample/basic-crudexample.component";
import {OldClickerGameComponent} from "./examples/clicker-game/old-clicker-game.component";
import {ScanExampleComponent} from "./examples/rxjs/transform-operators/scanexample/scan-example.component";
import {
  ResetIntervalExampleComponent
} from "./examples/rxjs/timing/reset-interval-example/reset-interval-example.component";
import {ClickerGameComponent} from "./examples/clicker-game/clicker-game.component";
import {OverlayComponent} from "./examples/directives/overlay-example/overlay/overlay.component";
import {D3ImportComponent} from "./examples/d3/d3-simport/d3-import.component";
import {D3ReactiveComponent} from "./examples/d3/d3-reactive/d3-reactive.component";

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

const pocketbaseRoutes: Routes = [
  {
    path: "misc",
    children:[
      {
        path: "untitled1",
        component: BasicCRUDExampleComponent
      }
    ]
  }
]

const clickerGameRoutes: Routes = [
  {
    path: "game",
    component: ClickerGameComponent
  }
]

const rxjsRoutes : Routes = [
  {
    path: "transformation-operators",
    children:[
      {
        path: "example1",
        component: ScanExampleComponent
      }
    ]
  },
  {
    path: "timing",
    children:[
      {
        path: "reset-interval-example",
        component: ResetIntervalExampleComponent
      }
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

const directiveRoutes : Routes = [
  {
    path: "misc",
    children: [
      {
        path: "overlay-example",
        component: OverlayComponent
      },
    ]
  }
]

const d3jsRoutes : Routes = [
  {
    path: "basics",
    children: [
      {
        path: "import",
        component: D3ImportComponent
      },
    ]
  },
  {
    path: "observable",
    children: [
      {
        path: "zoom-to-bounding-box",
        component: D3ReactiveComponent
      },
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
  },
  {
    path: "angular-pocketbase",
    children: pocketbaseRoutes
  },
  {
    path: "clickergame",
    children: clickerGameRoutes
  },
  {
    path: "rxjs",
    children: rxjsRoutes
  },
  {
    path: "directives",
    children: directiveRoutes
  },
  {
    path: "d3js",
    children: d3jsRoutes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
