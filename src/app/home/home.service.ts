import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { Course } from "../model/course";

@Injectable()
export class HomeService {
  constructor() {}

  splitCourses(
    http$: Observable<unknown>,
    category: string
  ): Observable<Course[]> {
    return http$.pipe(
      concatMap((res: Observable<Course[]>) =>
        of(res["payload"]).pipe(
          map((courses: Course[]) =>
            courses.filter((course: Course) => {
              return course.category === category;
            })
          )
        )
      )
    );
  }
}
