import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {IntersectionObserverModule} from "@ng-web-apis/intersection-observer";

interface Picture {
  id: number,
  author: string,
  width: number,
  height: number,
  url: string,
  download_url: string
}

@Component({
  selector: 'app-scroll-content-load',
  standalone: true,
  imports: [CommonModule, HttpClientModule, IntersectionObserverModule],
  template: `
    <div class="header">
      <h1 class="header heading">ScrollApp!</h1>
      <article>

      </article>
    </div>


    <img *ngFor="let picture of pictures$ | async"  width="480" height="360" [src]="picture.download_url"/>

    <div class="loading-indicator" waIntersectionObserver waIntersectionThreshold="0.1" (waIntersectionObservee)="infiniteScrollReached$.next()">
      <p>Loading Indicator</p>
    </div>
  `,
  styles: [
    `
      .header{
        width: 100%;
        height: 10vh;
        background-color: dodgerblue;
      }
      .header > h1{
        color: white;
        margin: 0;
        font-family: sans-serif;
      }
      .loading-indicator{
        background-color: crimson;
        min-height: 10vh;
        color: white;
      }
    `
  ]
})
export class ScrollContentLoadComponent {

  private LOREMPICSUM_PAGE: number = 1;
  private LOREMPICSUM_REQUEST_LIMIT = 10;
  readonly LOREMPICSUM_URL = "https://picsum.photos"
  readonly LOREMPICSUM_PAGINATED_URL = "https://picsum.photos/v2/list"

  infiniteScrollReached$ : Subject<void> = new Subject<void>()

  pictures$ : BehaviorSubject<Picture[]> = new BehaviorSubject<Picture[]>([]);
  constructor(private http: HttpClient) {
    this.infiniteScrollReached$.subscribe(this.getPictures.bind(this))
  }

  getPicture() {
    this.http
      .get(
      this.LOREMPICSUM_URL + '/480/360',
      {responseType: 'blob'}
    )
      .subscribe((data : any) => {
        let objectURL = URL.createObjectURL(data);
        //this.picture = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      })
  }

  getPictures(){
    console.log("Loading Pictures!")
    const options = {
      params: new HttpParams()
        .set('page', this.LOREMPICSUM_PAGE)
        .set('limit',this.LOREMPICSUM_REQUEST_LIMIT),
    }
     this.http.get<Picture[]>(
      this.LOREMPICSUM_PAGINATED_URL, options
    ).subscribe(data => {
        const pictures= this.pictures$.value.concat(data);
        this.pictures$.next(pictures)
        this.LOREMPICSUM_PAGE++;
     })
  }



}
