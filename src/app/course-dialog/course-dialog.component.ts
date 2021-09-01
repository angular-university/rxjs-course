import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {fromEvent, noop} from 'rxjs';
import {concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Store} from '../common/store.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course:Course;

    @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

    @ViewChild('searchInput', { static: true }) searchInput : ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,
        private store:Store) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

  /**
   *  we are going to show that Merge is ideal for performing
   * HTTP requests in parallel, as we have seen before,
   * use of concat map here is ensuring that our first
   * course save is going to be completed before issuing
   * the second one.
   * This is the logic that we want here for save operations.
   *   ngOnInit() {
    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        concatMap(changes => this.saveCourse(changes))
      )
      .subscribe();
    }
   * But if you find yourself in a situation where you would
   * like to perform multiple calls to your backend in parallel
   * and fetch the results of each call as they arrive over time,
   * then in that case you canstill use here the merge map operator.
   */

  /**
   * Merge map is very similar to concat map that we already covered.
   * The principle is the same. We are going to take the values
   * of the source observable and we are going to apply a mapping
   * function that is going to take the value and it's going to
   * produce a new observable. So here the value one was taken
   * and by running this function here, we have created here a
   * new observable which takes the value multiply it by ten
   * and then terminates the observable,
   * the observable gets completed.
   *
   */


  /**
   * So remember before we were using concat map so the save
   * operations would all work sequentially.
   * We will have to wait for the save to complete in order to
   * proceed and perform the next save.
   * If instead of concat map we use merge map,
   * the behavior is going to be different.
   * Let's switch over here to a larger window and tried to issue
   * several saves.
   * In parallel, we are here on the network, so let's now type
   * in here title over the course so that we can emit multiple
   * observables.
   * As you can see here in the waterfall diagram,
   * we have several requests running in parallel.
   * At the same time, we are not waiting for one request to
   * complete before launching another.
   * So the merge map operator is ideal for performing HTTP requests
   * in parallel.
   * However, in the concrete scenario of a save, we want
   * really to make sure that the save is completed
   * before performing a second save.
   * So if the order of the observable values is important,
   * then we should use concat map.
   * If we want to perform our observables in parallel,
   * then we use merge map.
   * And with these we have given the concat map and the merge map
   * operators. What we are going to do next is we are going
   * to cover two other very commonly used mapping operators
   * exhaust map and switch map.
   */

  ngOnInit() {
    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        mergeMap(changes => this.saveCourse(changes))
      )
      .subscribe();
    }


  saveCourse(changes) {
    return fromPromise(fetch(`/api/courses/${this.course.id}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }));
    }

    ngAfterViewInit() {}

    save() {
        this.store.saveCourse(this.course.id, this.form.value)
            .subscribe(
                () => this.close(),
                err => console.log("Error saving course", err)
            );
    }




    close() {
        this.dialogRef.close();
    }


}
