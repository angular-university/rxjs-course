import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {CoursesService} from "../services/courses.service";
import {map, tap} from 'rxjs/operators';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

    courses$: Observable<Course[]>;

    constructor(private coursesService: CoursesService) {

    }

    ngOnInit() {
        this.courses$ = this.coursesService.findAllCourses()
            .pipe(
                map(Object.values)
            );
    }

    ngAfterViewInit() {





    }

}
