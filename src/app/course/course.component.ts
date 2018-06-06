import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {debounceTime, distinctUntilChanged, startWith, tap, delay, map} from 'rxjs/operators';
import {merge, fromEvent, Observable} from 'rxjs';
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


    @ViewChild('input') input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {

        const courseId = this.route.snapshot.params['id'];

        this.course$ = createHttpObservable(`/api/courses/${courseId}`);

        this.lessons$ = createHttpObservable(`/api/lessons?courseId=${courseId}&pageSize=100`)
            .pipe(
                map(res => res['payload'])
            );

    }

    ngAfterViewInit() {



    }



}
