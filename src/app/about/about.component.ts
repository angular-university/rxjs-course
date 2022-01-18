import { Component, OnInit } from "@angular/core";
import { fromEvent, interval, merge, Observable, timer } from "rxjs";
import { map } from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    /*
    // BEGINNING UNDERSTANDING OF CORE CONCEPTS!!!
    const interval$: Observable<number> = interval(1000);

    // interval$.subscribe((val) => console.log("streamInterval 1 => " + val));
    // interval$.subscribe((val) => console.log("streamInterval 2 => " + val));

    const timer$: Observable<number> = timer(3000, 1000);

    const sub = timer$.subscribe((val) =>
      console.log("streamTimer 1 => " + val)
    );

    setTimeout(() => sub.unsubscribe(), 5000);

    const click$: Observable<Event> = fromEvent(document, "click");

    click$.subscribe(
      (evt) => console.log(evt),
      (err) => console.log(err),
      () => console.log("completed")
    );

    */

    //Merge Operator

    const interval1$ = interval(1000);
    const interval2$ = interval1$.pipe(map((val) => 10 * val));

    const results$ = merge(interval1$, interval2$);
    results$.subscribe(console.log);
  }
}
