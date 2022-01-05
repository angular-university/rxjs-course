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
    console.log(http$.subscribe((data) => console.log(data)));

    /*
    // RENDERING COURSES USING FILTER
    const courses$: Observable<Course[]> = http$.pipe(
      map((res) => Object.values(res["payload"]))
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
    */

    //SAME AS ABOVE JUST USING EXTERNAL FUNCTION IN HOME SERVICE
    this.beginnersCourses$ = this.homeService.splitCourses(http$, "BEGINNER");
    this.advancedCourses$ = this.homeService.splitCourses(http$, "ADVANCED");
  }
}
