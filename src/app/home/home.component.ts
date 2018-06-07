import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, Observable, of, timer} from 'rxjs';
import {CoursesService} from "../services/courses.service";
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor() {

    }

    ngOnInit() {

        const courses$: Observable<Course[]> = createHttpObservable('/api/courses')
            .pipe(
                shareReplay(),
                map(res => res['payload']),
                retryWhen(errors =>
                    errors
                        .pipe(
                            tap(err => console.log('error, trying in 2 seconds:', err)),
                            delayWhen(() => timer(2000))
                        )
                ),
                catchError(err => {
                    console.log('error ocurred', err);
                    return of([]);
                })
            );

        this.beginnerCourses$ = courses$.pipe(
          map(courses => courses.filter(course => course.category === 'BEGINNER') )
        );

        this.advancedCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category === 'ADVANCED') )
        );

    }

}
