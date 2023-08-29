import { Component, OnInit } from "@angular/core";
import { Observable, fromEvent, timer } from "rxjs";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    document.addEventListener("click", (event) => {
      console.log(event);

      setTimeout(() => {
        console.log("finished...");

        let counter = 0;

        setInterval(() => {
          console.log(counter++);
        }, 1000);
      }, 3000);
    });

    const interval$: Observable<number> = timer(3000, 1000);
    const subscription = interval$.subscribe(val => console.log("stream 1 => " + val));

    setTimeout(() => {
      subscription.unsubscribe();
    }, 5000);

    const click$ = fromEvent(document, 'click');
    click$.subscribe(
      // Handle emitted values
      event => console.log(event),
      // Handle errors or...
      error => console.log(error),
      // ... complete.
      () => console.log('completed')
    );

  }
}
