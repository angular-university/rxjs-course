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

    //BUILDING HTTP OBSERVABLE
    const http$ = new Observable((observer) => {
      fetch('/api/courses')
        .then((response) => {
          return response.json();
        })
        .then((body) => {
          observer.next(body);

          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
        })
    });

    http$.subscribe(
      (courses: any) => console.log(courses),
      () => {}, //noop is the same
      () => console.log("completed")
    );
  }
}
