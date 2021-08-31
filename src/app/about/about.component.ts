import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
    concat,
    fromEvent,
    interval,
    noop,
    observable,
    Observable,
    of,
    timer,
    merge,
    BehaviorSubject,
    AsyncSubject,
    ReplaySubject
} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import { createHttpObservable } from '../util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {

  /*
    every click that you do in the app that will be a stream
    of values containing the click event
  */

      // document.addEventListener('click', evt => {
      //   console.log(evt)
      // })

      /*
        F12
        so what we see here is whnever we click on the mouse is
        an example of a stream of values that are being emitted
        over time
      */

      // emitting a value each second
      // we will define a variable,
      // then we will ini to 0 and
      // we are going to emit a new value over time
      // and increment the counter each time that we emit our value
      // let counter = 0;
      // setInterval(() => {
      //   console.log(counter);
      //   counter++;
      // }, 1000);


  /* now we have 2 independent streams of values
  clicks and interval.
  Let's add another type of stream: setTimeout
  */

  // this is async operation
  // this stream emits only one value and then completes it
  // setTimeout emits a value and completes
  // the other 2 emit multiple values and never complete

      setTimeout(() => {
        console.log('finished ... ');
      }, 3000);


/*
setInterval continuesly emits the values
click streams only when clicked on
setTimeout finishes exectuting after 3 seconds

click and setInterval are multi value streams
they continuesly emit and they never compelte
*/



/*
Video 6 - what is Rxjs and what problem it solves

1. combine all 3 streams together
2. after a user clicks on the certain part of the screen
3. we might want to wait for 3 seconds and only then emit the interval

*/

/* ----- callback hell ---- */
/*
      document.addEventListener('click', evt => {
        console.log(evt);

        setTimeout(() => {
          console.log('finished ... ');


          let counter = 0;
          setInterval( ()=> {
              console.log(counter);
              counter++;
          }, 1000)
        }, 3000)
      })

      this block of code will not work until you click
      somewhere on the screen

      you will see a duplicate execution
      if you click on the screen multiple times
*/


      // const http$ = new Observable(observer => {
      //   fetch('/api/courses')
      //     .then(response => {
      //       return response.json();
      //     })

      //     .then(body => {
      //       observer.next(body);
      //       observer.complete();
      //     })
      //     .catch(err => {
      //       observer.error(err);
      //     });
      // });


      const http$ = createHttpObservable('/api/courses');

      const courses$ = http$
        .pipe(
          map(res =>  Object.values(res["payload"] ))
      );

      courses$.subscribe(
        courses => {
          console.log(courses)
          // console.log(typeof courses)
        },
        noop,
        () => console.log('completed')
      );

      // http$.subscribe(
      //   courses => console.log(courses),
      //   noop,
      //   () => console.log('completed')
      // );
  }
}
