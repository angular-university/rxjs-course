import { Component, OnInit } from "@angular/core";
import { Course, Payload } from "../model/course";
import { interval, Observable, of, timer } from "rxjs";
import {
  catchError,
  concatMap,
  delayWhen,
  filter,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";
import { createHttpObservable } from "../common/util";
import { HomeService } from "./home.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginnersCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    const http$ = createHttpObservable("/api/courses");

    // RENDERING COURSES USING FILTER
    const courses$: Observable<Course[]> = http$.pipe(
      map((res) => Object.values(res["payload"])),
      shareReplay(), //Operator to make just one API call (See inspector when open home component)
      catchError((err) =>
        of([
          {
            id: 0,
            description: "RxJs In Practice Course",
            iconUrl:
              "https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png",
            courseListIcon:
              "https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png",
            longDescription:
              "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
            category: "ADVANCE",
            lessonsCount: 10,
          },
        ])
      )
    );

    this.beginnersCourses$ = courses$.pipe(
      map((courses: any) =>
        courses.filter(
          (course: { category: string }) => course.category === "BEGINNER"
        )
      )
    );

    this.advancedCourses$ = courses$.pipe(
      map((courses: any) =>
        courses.filter(
          (course: { category: string }) => course.category === "ADVANCED"
        )
      )
    );

    //SAME AS ABOVE JUST USING EXTERNAL FUNCTION IN HOME SERVICE
    // this.beginnersCourses$ = this.homeService.splitCourses(http$, "BEGINNER");
    // this.advancedCourses$ = this.homeService.splitCourses(http$, "ADVANCED");
  }
}
