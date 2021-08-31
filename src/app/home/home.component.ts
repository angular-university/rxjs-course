import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';
import {Store} from '../common/store.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;


    constructor(private store:Store) {

    }

  ngOnInit() {

    // const courses$ = this.store.courses$;
    const http$ = createHttpObservable('/api/courses');
    this.beginnerCourses$ = this.store.selectBeginnerCourses();
    this.advancedCourses$ = this.store.selectAdvancedCourses();


    const courses$: Observable<Course[]> = http$
      .pipe(
        // tap operatot that is meant ot  be used to produce
        // side effects in our observable schema
        // we want to update somethingthing outside of the observable shein
        // such as updating a variable at the level of the component
        // or issue a login statement
        tap( () => console.log('http request executed')),
        map(res => Object.values(res['payload'])),
        // SHAREREPLAY() operator is going to make sure
        //  that our http response is going to be passed to each subscription
        shareReplay()
      );

    courses$.subscribe();
    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => courses
          .filter( course => course.category === 'BEGINNER'))
      );

      this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses
          .filter( course => course.category === 'ADVANCED'))
      );

  }
}

/**
 * this.beginnerCourses$ and this.advancedCourses$ subscriptions
 * is going to trigger the execution of a separate http request
 * because each subscription is taking over the blueprint of the stream
 * that we have here  courses$
      .pipe(
        map(courses => courses
          .filter( course => course.category === 'BEGINNER'))
      );
  * and it is using to instatiate the concreame stream of values
   *  go to network tab click on xhr network reques /courses will be pulled twice

*/
