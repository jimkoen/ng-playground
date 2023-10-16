import {AfterViewInit, Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from "d3";
import { from, Observable } from "rxjs";


type rowType = {
  Monat: Date,
  CPI: number,
  Energy: number,
  Food: number
}
@Component({
  selector: 'app-d3-simport',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      d3-simport works!
    </p>
    <div #d3Container></div>
  `,
  styles: [
  ]
})
export class D3ImportComponent implements AfterViewInit{
  @ViewChild('d3Container') d3Container : ElementRef<HTMLDivElement> | undefined
  private data$ : Observable<d3.DSVParsedArray<rowType>> | undefined

  constructor(private zone: NgZone) {

  }

  ngAfterViewInit() {
    this.data$ = from(d3.dsv(';', '/assets/cpi-fuel-food.csv', d3.autoType)) as Observable<d3.DSVParsedArray<rowType>>

    this.data$.subscribe(d  => {
      this.zone.runOutsideAngular(() => {
        this.d3Container?.nativeElement.appendChild(this.createChart(d)!)
      })
    })

  }

  createChart(data : d3.DSVParsedArray<rowType>) : SVGSVGElement | null{
    const width = 928
    const height = 500
    const marginTop = 20
    const marginRight = 30
    const marginBottom = 30
    const marginLeft = 40

    // @ts-ignore
    const x = d3.scaleUtc(d3.extent(data, d => d.Monat ), [marginLeft, width - marginRight])

    // @ts-ignore
    const y = d3.scaleLinear([90, d3.max(data, d => d.Energy) + 30], [height - marginBottom, marginTop]);

    const areaCPI = d3.line<rowType>()
      .x(d => x(d.Monat))
      .y(d => y(d.CPI));

    const areaEnergy = d3.line<rowType>()
      .x(d => x(d.Monat))
      .y(d => y(d.Energy));

    const areaFood = d3.line<rowType>()
      .x(d => x(d.Monat))
      .y(d => y(d.Food));

    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");


    svg.append("path")
      .attr("stroke", "pink")
      .attr("fill-opacity","0")
      .attr("d", areaEnergy(data));
    svg.append("path")
      .attr("stroke", "green")
      .attr("fill-opacity","0")
      .attr("d", areaFood(data));
    svg.append("path")
      .attr("stroke", "steelblue")
      .attr("fill-opacity","0")
      .attr("d", areaCPI(data));





    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Daily close ($)"));

    return svg.node();

  }
}
