import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Course} from '../model/course';
import {Observable} from 'rxjs/Observable';
import {CoursesService} from './courses.service';
import {first, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {isPlatformServer} from '@angular/common';
import {makeStateKey, TransferState} from '@angular/platform-browser';


@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(
        private coursesService: CoursesService,
        @Inject(PLATFORM_ID) private platformId,
        private transferState:TransferState
    ) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {

        const courseId = route.params['id'];

        const COURSE_KEY = makeStateKey<Course>('course-' + courseId);

        if (this.transferState.hasKey(COURSE_KEY)) {

            const course = this.transferState.get<Course>(COURSE_KEY, null);

            this.transferState.remove(COURSE_KEY);

            return of(course);
        }
        else {
            return this.coursesService.findCourseById(courseId)
                .pipe(
                    first(),
                    tap(course => {

                        if (isPlatformServer(this.platformId)) {
                            this.transferState.set(COURSE_KEY, course);
                        }

                    })
                );

        }


    }

}