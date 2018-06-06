import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {createHttpObservable} from '../common/util';
import {Lesson} from '../model/lesson';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course$: Observable<Course>;

    lessons$: Observable<Lesson[]>;


    @ViewChild('searchInput') input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {

        const courseId = this.route.snapshot.params['id'];

        this.course$ = createHttpObservable(`/api/courses/${courseId}`);

    }

    ngAfterViewInit() {

        const searchLessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
            .pipe(
                map((event) => event.target.value),
                debounceTime(400),
                distinctUntilChanged(),
                withLatestFrom(this.course$),
                switchMap(([search, course]) => this.loadLessons(course, search))
            );

        const initialLessons$ = this.course$
            .pipe(
                concatMap(course => this.loadLessons(course))
            );


        this.lessons$ = concat<Lesson[]>(initialLessons$, searchLessons$);

    }


    loadLessons(course:Course, search = '') {
        return createHttpObservable(`/api/lessons?courseId=${course.id}&pageSize=${course.lessonsCount}&filter=${search}`)
            .pipe(
                map(res => res['payload'])
            );
    }


}
