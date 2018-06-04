import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../model/course';
import {Lesson} from '../model/lesson';
import {API_URL} from '../common/constants';


@Injectable()
export class CoursesService {

    findCourseById(courseId: string): Observable<Course> {
        return this.createHttpObservable(`${API_URL}/courses/${courseId}.json`);
    }

    findAllCourses(): Observable<Course[]> {
        return this.createHttpObservable(`${API_URL}/courses.json`);
    }

    findAllCourseLessons(courseId: string): Observable<Lesson[]> {
        return this.createHttpObservable(`${API_URL}/lessons/${courseId}.json`);
    }

    createHttpObservable(url: string) {
        return Observable.create(observer => {
            fetch(url)
                .then(response => response.json())
                .then(body => {
                    observer.next(body);
                    observer.complete();
                })
                .catch(err => observer.error(err));
        });
    }

}


