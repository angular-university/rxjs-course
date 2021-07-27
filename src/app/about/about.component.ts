import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fromEvent, interval, timer } from 'rxjs';
@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // RXJS
    const interval$ = interval(1000);
    // interval$.subscribe(val => console.log(`interval stream 1: ${val}`));

    const timer$ = timer(3000, 1000);
    // timer$.subscribe(val => console.log(`stream 1: ${val}`));
    // timer$.subscribe(val => console.log(`stream 2: ${val}`));

    const click$ = fromEvent(document, 'click');
    // click$.subscribe(val => console.log(val));

    // Using built-in JavaScript api
    // document.addEventListener('click', evt => {
    //   console.log(evt);
      
    //   setTimeout(() => {
    //     console.log('timeout elapsed')

    //     let counter = 0;
    //     setInterval(() => {
    //       console.log(counter);
    //       counter++;
    //     }, 1000);
    //   }, 3000);
    // });
  }
}
