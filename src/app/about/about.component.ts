import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fromEvent, interval, noop, observable, Observable, timer} from 'rxjs';
import {delayWhen, filter, map, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {


    }

}






