import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fromEvent, interval, noop, observable, Observable, timer} from 'rxjs';
import {delayWhen, map, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {

        const http$ = createHttpObservable('/api/courses');

        const courses$ = http$
            .pipe(
              map(res => Object.values(res["payload"]) )
            );


        courses$.subscribe(
            courses => console.log(courses),
            noop,
            () => console.log('completed')
        );

    }

}






