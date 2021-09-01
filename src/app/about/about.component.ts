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
    Subject,
    BehaviorSubject,
    AsyncSubject,
    ReplaySubject
} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  ngOnInit() {

    /**
     * Concat is all about completion,
     * waiting for when observable to complete before
     * subscribing and using the next observable.
     *
     * In this lesson and in the following one,
     * we are going to be covering a new strategy
     * for combining observables,
     *
     * which is going to be the merge strategy.
     * Let's first introduce, merge and then cover merge map.
     */

      /**
       * So what is the use case for merge?
       * Going back here to our Marrable diagram,
       * we're going to see that merge should be used.
       * If we want to take multiple observables,
       * subscribe to all of them and notice here at the same time
       * and take the values of each of these observables.
       * Merge is ideal for performing asynchronous
       * operations in parallel.
       */

    /**
     * So as you can see, the first observable is emitting values more
     * or less at the same time as the second observable was one of
     * the two observables emits a value.
     *
     * stream 1 : a, b, c, d  - complete
     * stream 2 : e, f, g, h - complete
     *
     * merge output is a, e, b, f, c, g, d, h
     *
     * The same for the second observable as
     * each of these observables emit a new value.
     *
     * observable is completed only
     * when all the merged observables are completed.
     *
     * On the other hand, if any of these observables frozen error,
     * then the resulting merged observable is going to air out
     * immediately.
     */

    /**
     * Example 1
     * We are going to start by defining here one stream.
     */

    const interval1$ = interval(1000);
    const interval2$ = interval1$.pipe(
      map(val => 10 * val));
    const result$ = merge(interval1$, interval2$);
    result$.subscribe(console.log);

    /**
     * As we can see, the merge strategy is ideal for
     * performing long running operations in parallel and getting
     * the results of each of the operations combined.
     */

  }
}
