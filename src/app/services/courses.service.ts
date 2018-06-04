

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../model/course";
import {Lesson} from "../model/lesson";
import {map} from 'rxjs/operators';
import {API_URL} from '../common/constants';



@Injectable()
export class CoursesService {

    constructor(private http: HttpClient) {

    }

    findCourseById(courseId: string): Observable<Course> {
        return this.http.get<Course>(`${API_URL}/courses/${courseId}.json`);
    }

    findAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(`${API_URL}/courses.json`);
    }

    findAllCourseLessons(courseId:string): Observable<Lesson[]> {
        return this.http.get<Lesson[]>(`${API_URL}/lessons/${courseId}.json`);
    }
}