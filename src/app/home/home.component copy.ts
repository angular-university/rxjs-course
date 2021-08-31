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

  constructor(private store: Store) {
  }

  ngOnInit() {

    // const courses$ = this.store.courses$;
    this.beginnerCourses$ = this.store.selectBeginnerCourses();
    this.advancedCourses$ = this.store.selectAdvancedCourses();

    // const http$: Observable<Course[]> = createHttpObservable('/api/courses');
    const http$ = createHttpObservable('/api/courses');

    const courses$: Observable<Course[]> = http$
      .pipe(
        map(res => Object.values(res['payload']))
      );
      // console.log(courses$);

      // section 2 video - 12  - reactive design
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

    //   this.beginnerCourses$ = http$
    //   .pipe(
    //     map(
    //       filter(course => course.category === 'BEGINNER')
    // );



    // //   this.advancedCourses$ = http$
    // //   .pipe(
    // //     map(courses => courses
    // //       .filter(course => course.category === 'ADVANCED'))
    // // );


    //   // courses$.subscribe(
    //     // courses => {
    //     //   this.beginnerCourses$ = courses
    //     //     .filter(course => course.category === 'BEGINNER');

    //   //     this.advancedCourses$ = courses
    //   //       .filter(course => course.category === 'ADVANCED');
    //   //     // console.log(typeof courses)
    //   //   },
    //   //   noop,
    //   //   () => console.log('completed')
    //   // );

  }
}

