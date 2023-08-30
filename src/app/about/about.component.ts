import { Component, OnInit } from "@angular/core";
import { Observable, fromEvent, noop, timer } from "rxjs";

import { createHttpObservable } from "../common/util";
import { map } from "rxjs/operators";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {

    // 1.
    // document.addEventListener("click", (event) => {
    //   console.log(event);

    //   setTimeout(() => {
    //     console.log("finished...");

    //     let counter = 0;

    //     setInterval(() => {
    //       console.log(counter++);
    //     }, 1000);
    //   }, 3000);
    // });

    // 2.
    // const interval$: Observable<number> = timer(3000, 1000);
    // const subscription = interval$.subscribe(val => console.log("stream 1 => " + val));

    // setTimeout(() => {
    //   console.log("unsubscribing...");
    //   subscription.unsubscribe();
    // }, 5000);

    // 3.
    // const click$ = fromEvent(document, 'click');
    // click$.subscribe(
    //   // Handle emitted values
    //   event => console.log(event),
    //   // Handle errors or...
    //   error => console.log(error),
    //   // ... complete.
    //   () => console.log('completed')
    // );

    // 4.
    const http$ = createHttpObservable('/api/courses');

    const courses$ = http$
      .pipe(
        map(response => Object.values(response['payload']))
      )

    courses$.subscribe(
      courses => console.log(courses),
      noop,
      () => console.log('completed')
    );

  }
}
