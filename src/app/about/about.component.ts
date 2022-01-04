import { Component, OnInit } from "@angular/core";
import { fromEvent, interval, Observable, timer } from "rxjs";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const interval$: Observable<number> = interval(1000);

    // interval$.subscribe((val) => console.log("streamInterval 1 => " + val));
    // interval$.subscribe((val) => console.log("streamInterval 2 => " + val));

    const timer$: Observable<number> = timer(3000, 1000);

    timer$.subscribe((val) => console.log("streamTimer 1 => " + val));

    const click$: Observable<Event> = fromEvent(document, "click");
    click$.subscribe((evt) => console.log(evt));
  }
}
