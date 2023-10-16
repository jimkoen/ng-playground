import {AfterViewInit, Component, ElementRef, NgZone, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {BehaviorSubject, from, Observable, Subject} from "rxjs";
import {Topology, Objects, MultiPolygon, GeometryCollection} from 'topojson-specification'
import { Feature, Geometry } from 'geojson'
import {GeoPath, GeoPermissibleObjects} from "d3";

type USAlbersStates = {
  states : GeometryCollection<{name: string}>,
  nation : GeometryCollection<{name: string}>,
}

@Component({
  selector: 'app-d3-reactive',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      d3-reactive works!
    </p>
    <div #d3Container></div>
  `,
  styles: [
  ]
})
export class D3ReactiveComponent implements AfterViewInit, OnChanges{
  private svgProperties = {
    width : 975,
    height : 610
  }
  private svg : d3.Selection<SVGSVGElement, undefined, null, undefined> | undefined
  private g : d3.Selection<SVGGElement, undefined, null, undefined> | undefined
  private path: GeoPath<any, GeoPermissibleObjects> = d3.geoPath();

  private states :  d3.Selection<
    d3.BaseType | SVGPathElement,
    Feature<Geometry, {name: string}>,
    SVGGElement,
    undefined> | undefined
  @ViewChild('d3Container') d3Container : ElementRef<HTMLDivElement> | undefined


  private us$ = from(d3.json<Topology<USAlbersStates>>('/assets/states-albers-10m.json'))
  constructor(private zone: NgZone) {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }


  ngAfterViewInit() {
    this.us$ = from(d3.json<Topology<USAlbersStates>>('/assets/states-albers-10m.json'))

    this.us$.subscribe(us => {
        this.zone.runOutsideAngular(() => {
          this.d3Container?.nativeElement.appendChild(this.createChart(us as Topology<USAlbersStates>)!)
        })
    })
  }

  createChart(us : Topology<USAlbersStates>){

    this.svg = d3.create("svg")
      .attr("viewBox", [0, 0, this.svgProperties.width, this.svgProperties.height])
      .attr("width", this.svgProperties.width)
      .attr("height", this.svgProperties.height)
      .attr("style", "max-width: 100%; height: auto;")
      //.on("click", reset);


    this.g = this.svg?.append("g");

    this.states = this.g.append("g")
      .attr("fill", "#444")
      .attr("cursor", "pointer")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
        .join("path")
      .attr("d", this.path)
      .on('click', this.stateClicked)
      .attr("d", this.path)


    this.states?.append("title")
      .text(d => d.properties.name);

    this.g.append("path")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", this.path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));

    //@ts-ignore
    this.svg?.call(this.zoom)

    return this.svg?.node()
  }


  stateClicked = (event: Event, d : Feature<Geometry, {name: string}>) => {
    const [[x0, y0], [x1, y1]] = this.path.bounds(d)
    event.stopPropagation()
    this.states?.transition().style("fill", null);
    // todo: Figure out why d3.select in DefinetelyTyped's d3 types does not expose an overload for calling with an event
    // The below call will fail if event is not typed as "any"
    d3.select(event.target as any).transition().style("fill", "red");
    this.svg?.transition().duration(750).call(
      // @ts-ignore
      this.zoom.transform,
      d3.zoomIdentity
        .translate(this.svgProperties.width / 2, this.svgProperties.height / 2)
        .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / this.svgProperties.width, (y1 - y0) / this.svgProperties.height)))
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
      d3.pointer(event, this.svg?.node())
    );
    console.log(d, event)
  }

  zoomed = (event : any) => {
    console.log("zoomed called")
    const {transform} = event;
    this.g?.attr("transform", transform);
    this.g?.attr("stroke-width", 1 / transform.k);
  }

  private zoom:  d3.ZoomBehavior<Element, unknown> = d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", this.zoomed);
}
